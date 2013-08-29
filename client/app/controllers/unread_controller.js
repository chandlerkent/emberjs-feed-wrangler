/* globals FeedItemsController */

App.UnreadController = FeedItemsController.extend({
  init: function() {
    this.get("unreadCount");
  },
  
  unreadCount: function() {
    var unreadItems = this.filter(function(item) {
      return !item.get("read");
    });
    
    return unreadItems.get("length");
  }.property("this.@each.read")
});