/* globals ScrollWindowToTopRoute */

App.LoginRoute = Ember.Route.extend(ScrollWindowToTopRoute, {
  redirect: function() {
    if (App.SessionController.get("isAuthenticated")) {
      this.transitionTo("index"); 
    }
  },
  
  setupController: function(controller) {
    controller.reset(); 
  }
});