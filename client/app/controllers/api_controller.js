/* global WorkCoalescingController */

require("app/controllers/work_coalescing_controller");

var APIController = Ember.Object.extend({
  baseUrl: "",
  apiToken: "",
  clientKey: "",
  
  _itemsToMarkRead: null,
  _coalescingWorkController: null,
  
  init: function() {
    this._super();
    
    this.set("_itemsToMarkRead", []);
    this.set("_coalescingWorkController", WorkCoalescingController.create({
      timerInterval: 1000
    }));
  },
  
  buildQueryStringFromObject: function(params) {
    var qsParams = [];
    for (var param in params) {
      if (!params.hasOwnProperty(param)) {
        continue;
      }
      if (Ember.isEmpty(params[param])) {
        continue;
      }
      qsParams.push({key: param, value: params[param]});
    }
    
    var qsString = qsParams.map(function(param) { return encodeURIComponent(param.key) + "=" + encodeURIComponent(param.value); }).join("&");
    
    return qsString;
  },
  
  constructApiUrl: function(path, params) {
    var c = App.getPreambledConsole("APIController.constructApiUrl");
    
    params = params || {};
    params["access_token"] = params["access_token"] || this.get("apiToken");
    params["client_key"] = params["client_key"] || this.get("clientKey");
    var url = "%@%@?%@".fmt(this.get("baseUrl"), path, this.buildQueryStringFromObject(params));
    
    c.info(url);
    
    return url;
  },
  
  getJSON: function(url, part) {
    var c = App.getPreambledConsole("APIController.getJSON");
    
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      $.getJSON(url)
      .done(function(data) {
        c.log("received", data);
        if (data.error == null) {
          if (part && data.hasOwnProperty(part)) {
            c.log("returning only", part);
            data = data[part];
          }
          resolve(data);
        }
        else {
          reject(data.error); 
        }
      })
      .fail(function(data) {
        c.error("getJSON failed.", data);
        reject("unknown failure");
      });
    });
    
    return promise;
  },
  
  getJSONAndTransform: function(url, part, mapFn) {
    return this.getJSON(url, part)
      .then(function(data) {
        return data.map(mapFn);
      });
  },
  
  getJSONAndTransformIntoEmberObjects: function(url, part, mapFn) {
    return this.getJSONAndTransform(url, part, mapFn)
    .then(function(data) {
      return data.map(function(datum) {
        return Ember.Object.create(datum);
      });
    });
  },
  
  getFeedItems: function(url, part) {
    part = part || "feed_items";
    return this.getJSONAndTransformIntoEmberObjects(url, part, function(datum) {
      datum.id = datum.feed_item_id;
      datum.feed = {
        id: datum.feed_id
      };
      return datum;
    });
  },
  
  updateFeedItem: function(model, props) {
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      var dataOrig = model.getProperties("feed_item_id", "read_later", "starred", "read");
      var dataNew = Ember.copy(dataOrig, true);
      for (var prop in props) {
        dataNew[prop] = props[prop];
      }
      model.setProperties(props);
      App.API.getJSON(App.API.constructApiUrl("feed_items/update/", dataNew), "feed_item")
      .then(function(result) {
        model.setProperties(result);
        resolve(model);
      }, function(error) {
        model.setProperties(dataOrig);
        reject(error);       
      });
    });
    
    return promise;
  },
    
  markFeedItemRead: function(model) { 
    var c = App.getPreambledConsole("APIController.markFeedItemRead");
    this.get("_itemsToMarkRead").push(model.get("id"));
    
    model.set("read", true);
    
    var self = this;
    this.get("_coalescingWorkController").scheduleWork(function() {
      c.log("Marking read:", self.get("_itemsToMarkRead"));
      self.markFeedItemsRead(self.get("_itemsToMarkRead"));
      self.set("_itemsToMarkRead", []);
    });
  },
  
  markFeedItemsRead: function(feedItemIds) {
    if (feedItemIds.length <= 0) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        resolve();
      });
    }
    
    return App.API.getJSON(App.API.constructApiUrl("feed_items/mark_all_read", { feed_item_ids: feedItemIds.join(",") }), "feed_items");
  },
  
  isAuthenticated: function() {
    return (!Ember.isEmpty(this.get("apiToken"))); 
  }.property("apiToken"),
  
  apiTokenChanged: function() {
    localStorage.apiToken = this.get("apiToken");
    if (Ember.isEmpty(this.get("apiToken"))) {
      delete localStorage.apiToken; 
    }
  }.observes("apiToken")
});