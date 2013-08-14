App.LogoutRoute = Ember.Route.extend({
  activate: function() {
    App.SessionController.current().logOut();
    
    this.transitionTo("index");
  }
});