var FeedItemsController = Ember.ArrayController.extend({
  isLoading: false,
  loadError: null,
  
  didSelectItem: function(model) {
    this.get("content").forEach(function(item) {
      if (item.get("isSelected")) {
        item.set("isSelected", false);
      }
    });
    
    model.set("isSelected", true);
    
    this.markItemRead(model);
  },
  
  markItemRead: function(model) {
    if (model.get("read")) {
      return;
    }
    
    App.API.markFeedItemRead(model);
  }
});