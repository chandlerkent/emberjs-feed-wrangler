App.LoginRoute = Ember.Route.extend({
  redirect: function() {
    if (App.API.get("isAuthenticated")) {
      this.transitionTo("index"); 
    }
  },
  
  setupController: function(controller) {
    controller.reset(); 
  }
});