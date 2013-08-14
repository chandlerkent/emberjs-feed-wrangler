App.LoginRoute = Ember.Route.extend({
  redirect: function() {
    if (App.SessionController.currentProp("isAuthenticated")) {
      this.transitionTo("index"); 
    }
  },
  
  setupController: function(controller) {
    controller.reset(); 
  }
});