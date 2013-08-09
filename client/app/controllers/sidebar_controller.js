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