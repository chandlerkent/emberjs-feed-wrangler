App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.reopen({
  getPreambledConsole: function(preamble) {
    preamble += ":";
    var unshift = [].unshift;
    return {
      info: function() {
        unshift.call(arguments, preamble);
        console.info.apply(console, arguments); 
      },
      
      log: function() {
        unshift.call(arguments, preamble);
        console.log.apply(console, arguments); 
      },
      
      warn: function() {
        unshift.call(arguments, preamble);
        console.warn.apply(console, arguments); 
      },
      
      error: function() {
        unshift.call(arguments, preamble);
        console.error.apply(console, arguments); 
      }
    };
  }
});

Ember.Handlebars.helper('timeAgo', function(value) {
  return moment(value * 1000).fromNow();
});

var APIController = Ember.Object.extend({
  baseUrl: "",
  apiToken: "",
  clientKey: "",
  
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
      var dataOrig = model.getProperties("feed_item_id", "read_later", "starred");
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

App.API = APIController.create({
  baseUrl: "/fw/api/v2/",
  apiToken: localStorage.apiToken,
  clientKey: CONFIG.client_key
});

App.Router.map(function() {
	this.resource('stream', { path: '/streams/:stream_id' });
  this.route("unread");
  this.route("newsfeed");
  this.route("newsfeed-search", { path: "/newsfeed/search/:search_term" });
  this.resource("feed", { path: "/newsfeed/feed/:feed_id" });
  this.route("starred");
  this.route("login");
});

var AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var c = App.getPreambledConsole("AuthenticatedRoute.beforeModel");
    
    if (!App.API.get("isAuthenticated")) {
      c.warn("Not authenticated");
      this.controllerFor("login").set("attemptedTransition", transition);
      this.transitionTo("login");
    }
  }
});

App.LoadableRoute = Ember.Mixin.create({
  setupParameters: function(controller, model) {
    return {}; 
  },
  
  modelIsResolved: function(model) {
    return (model && Ember.isArray(model));
  },
  
  setupController: function(controller, model) {
    if (this.modelIsResolved(model)) {
      this._super(controller, model);
      return;
    };
    
    controller.set("model", []);
    controller.set("isLoading", true);
    var params = this.setupParameters(controller, model);
    this.model(params)
    .then(function(data) {
      controller.setProperties({
        "isLoading": false,
        "loadError": null,
        "model": data
      });
    }, function(error) {
      controller.setProperties({
        "isLoading": false,
        "loadError": "Error: " + error,
        "model": []
      });
    });
  }
});

var FeedItemsController = Ember.ArrayController.extend({
  isLoading: false,
  loadError: null
});

App.ApplicationRoute = Ember.Route.extend({
  renderTemplate: function() {
    this._super();
    
    this.render('sidebar', {
      outlet: 'sidebar',
      into: "application",
      controller: this.controllerFor("sidebar")
    });
  },
  
  events: {
    openUrl: function(url) {
      window.open(url);
    },
    
    toggleReadLater: function(model) {
      App.API.updateFeedItem(model, { read_later: !model.get("read_later") });
    },
    
    toggleStar: function(model) {
      App.API.updateFeedItem(model, { starred: !model.get("starred") });
    },
    
    markAllRead: function(models) {
      var cachedModels = {};
      var ids = [];
      var cachedStatuses = {};
      
      models.forEach(function(model) {
        var id = model.get("id");
        if (!model.get("read")) {
          ids.push(id);
        }
        cachedStatuses[id] = model.get("read");
        cachedModels[id] = model;
        model.set("read", true);
      });
      
      if (ids.length <= 0) {
        return; 
      }
      
      App.API.getJSON(App.API.constructApiUrl("feed_items/mark_all_read", { feed_item_ids: ids.join(",") }), "feed_items")
      .then(function(results) {
        results.forEach(function(result) {
          var cachedModel = cachedModels[result.feed_item_id];
          if (!cachedModel) {
            return;
          }
          cachedModel.setProperties(result);
        });
      }, function() {
        models.forEach(function(model) {
          model.set("read", cachedStatuses[model.get("id")]);
        });
      });
    },
    
    unsubscribe: function(feedItems) {
      if (feedItems.length <= 0) {
        return;
      }
      
      var props = feedItems[0].getProperties("feed_id");
      App.API.getJSON(App.API.constructApiUrl("subscriptions/remove_feed/", props));
    }
  }
});

App.LoginRoute = Ember.Route.extend({
  setupController: function(controller) {
    controller.reset(); 
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo("unread");
  }
});

App.UnreadRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", { read: false }));
	}
});

App.NewsfeedRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/"));
	}
});

App.NewsfeedSearchRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
  setupParameters: function(controller, model) {
    return { search_term: model };
  },
  
	model: function(params) {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/search/", params));
	}
});

App.StarredRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", { starred: true }));
	}
});

App.FeedRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
	setupParameters: function(controller, model) {
    return { feed_id: model.id };
  },
	
	model: function(params) {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", params));
	}
});

App.StreamRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
	setupParameters: function(controller, model) {
    return { stream_id: model.id };
	},
	
	model: function(params) {
    return App.API.getFeedItems(App.API.constructApiUrl("streams/stream_items/", params));
	}
});

App.UnreadController = App.NewsfeedController = App.NewsfeedSearchController = App.StarredController = App.FeedController = App.StreamController = FeedItemsController.extend({
  
});

App.LoginController = Ember.Controller.extend({
  email: null,
  password: null,
  errorMessage: null,
  attemptedTransition: null,

  reset: function() {
    this.setProperties({
      email: "",
      password: "",
      errorMessage: "",
      attemptedTransition: null
    });
  },
  
  login: function() {
    var data = this.getProperties("email", "password");
    var self = this;
    
    App.API.getJSON(App.API.constructApiUrl("users/authorize/", data))
    .then(function(response) {
      App.API.set("apiToken", response["access_token"]);
      App.API.set("errorMessage", "");
      var transition = self.get("attemptedTransition");
      if (!Ember.isNone(transition)) {
        transition.retry();
      } else {
        self.transitionToRoute("index");
      }
      self.set("attemptedTransition", null);
    },
    function(value) {
      self.set("errorMessage", value);
    });
  },
  
  logOut: function() {
    App.API.getJSON(App.API.constructApiUrl("users/logout/"));
    App.API.set("apiToken", null);
    this.transitionToRoute("login");
  }
});

App.SidebarController = Ember.ArrayController.extend({
  streams: [],
  searchTerm: null,
  needs: "login",

  init: function() {
    this._super();
    
    this.loadStreams();
  },
  
  loadStreams: function() {
    if (!App.API.get("isAuthenticated")) {
      this.set("streams", []);
      return;
    }
    
    var self = this;
    App.API.getJSONAndTransform(App.API.constructApiUrl("streams/list/"), "streams", function(datum) {
        datum.id = datum.stream_id;
        return datum;
      })
    .then(function(data) {
      self.set("streams", data);
    }, function() {
      self.set("streams", []);
    });
  }.observes("App.API.isAuthenticated"),
  
  didSearch: function() {
    this.transitionToRoute("newsfeed-search", this.get("searchTerm"));
  },
  
  logOut: function() {
    this.get("controllers").get("login").logOut();
  }
});

App.StreamItemView = Ember.View.extend({
  templateName: "stream-item",
  isShowingBody: false,
  
	toggleBodyVisibility: function() {
		this.toggleProperty("isShowingBody");
  },
  
  click: function() {
    this.toggleBodyVisibility();
  }
});
