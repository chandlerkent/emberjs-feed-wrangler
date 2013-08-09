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
      
      App.API.markFeedItemsRead(ids)
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