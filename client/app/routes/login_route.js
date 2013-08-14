/* globals ScrollWindowToTopRoute */

App.LoginRoute = Ember.Route.extend(ScrollWindowToTopRoute, {
  redirect: function() {
    if (App.SessionController.currentProp("isAuthenticated")) {
      this.transitionTo("index"); 
    }
  },
  
  setupController: function(controller) {
    controller.reset(); 
  }
});