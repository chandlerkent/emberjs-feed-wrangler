var AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var c = App.getPreambledConsole("AuthenticatedRoute.beforeModel");
    
    if (!App.API.get("isAuthenticated")) {
      c.warn("Not authenticated");
      this.controllerFor("login").set("attemptedTransition", transition);
      this.transitionTo("login");
    }
  }
});