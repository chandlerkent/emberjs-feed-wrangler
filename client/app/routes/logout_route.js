App.LogoutRoute = Ember.Route.extend({
  activate: function() {
    App.SessionController.logOut();
    
    this.transitionTo("index");
  }
});