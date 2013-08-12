/* globals DelayedWorkController */

require("app/controllers/delayed_work_controller");

App.ApplicationRoute = Ember.Route.extend({
  renderTemplate: function() {
    this._super();
    
    var self = this;
    
    // delay this work so the loading of the data doesn't block rendering
    var delayedWorkController = DelayedWorkController.create({
      timerInterval: 0 
    });
    delayedWorkController.scheduleWork()
    .then(function() {
      self.render('sidebar', {
        outlet: 'sidebar',
        into: "application",
        controller: self.controllerFor("sidebar")
      });
    });
  },
  
  openUrl: function(url) {
    window.open(url);
  },
  
  events: {    
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