/* globals FeedItemsController */

App.UnreadController = FeedItemsController.extend({
  unreadCount: function() {
    var unreadItems = this.filter(function(item) {
      return !item.get("read");
    });
    
    return unreadItems.get("length");
  }.property("@each.read")
});