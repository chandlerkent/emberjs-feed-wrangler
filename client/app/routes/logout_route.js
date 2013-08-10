App.LogoutRoute = Ember.Route.extend({
  activate: function() {
    this.logOut();
    
    this.transitionTo("index");
  },
  
  logOut: function() {
    if (Ember.isEmpty(App.API.get("apiToken"))) {
      return;   
    }
    
    App.API.set("apiToken", null);
    App.API.getJSON(App.API.constructApiUrl("users/logout/"));
  }
});