App.SidebarController = Ember.ArrayController.extend({
  needs: ["login", "unread"],
  streams: [],
  unread: null,
  unreadBinding: "controllers.unread",
  searchTerm: null,
  isLoading: false,

  init: function() {
    this._super();
    
    this.loadStreams();
  },
  
  loadStreams: function() {
    if (!App.API.get("isAuthenticated")) {
      this.set("streams", []);
      return;
    }
    
    this.set("isLoading", true);
    
    var self = this;
    App.API.getJSONAndTransform(App.API.constructApiUrl("streams/list/"), "streams", function(datum) {
        datum.id = datum.stream_id;
        return datum;
      })
    .then(function(data) {
      self.set("streams", data);
      self.set("isLoading", false);
    }, function() {
      self.set("streams", []);
      self.set("isLoading", false);
    });
  }.observes("App.API.isAuthenticated"),
  
  didSearch: function() {
    this.transitionToRoute("newsfeed-search", this.get("searchTerm"));
  },
  
  logOut: function() {
    this.get("controllers").get("login").logOut();
  }
});