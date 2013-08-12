App.ApplicationController = Ember.Controller.extend({
  needs: "unread",
  unreadBinding: "controllers.unread",
  
  title: function() {
    return "Feed Wrangler (%@)".fmt(this.get("unread").get("unreadCount"));
  }.property("unread.unreadCount"),
  
  titleChanged: function() {
    document.title = this.get("title");
  }.observes("title")
});