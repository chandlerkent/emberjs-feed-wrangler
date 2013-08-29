App.ApplicationController = Ember.Controller.extend({
  needs: "unread",
  unread: null,
  unreadBinding: "controllers.unread",
  
  
  title: function() {
    return "Feed Wrangler (%@)".fmt(this.get("unread.unreadCount"));
  }.property("unread.unreadCount"),
  
  titleChanged: function() {
    document.title = this.get("title");
  }.observes("title"),
                                                    
  actions: {
    doTransitionToStarredRoute: function() {
      this.transitionToRoute("starred");
    },
    
    doTransitionToIndexRoute: function() {
      this.transitionToRoute("index"); 
    }
  }
});