App.LoginController = Ember.Controller.extend({
  email: null,
  password: null,
  errorMessage: null,
  attemptedTransition: null,

  reset: function() {
    this.setProperties({
      email: "",
      password: "",
      errorMessage: "",
      attemptedTransition: null
    });
  },
  
  login: function() {
    var data = this.getProperties("email", "password");
    var self = this;
    
    App.API.getJSON(App.API.constructApiUrl("users/authorize/", data))
    .then(function(response) {
      App.API.set("apiToken", response["access_token"]);
      App.API.set("errorMessage", "");
      var transition = self.get("attemptedTransition");
      if (!Ember.isNone(transition)) {
        transition.retry();
      } else {
        self.transitionToRoute("index");
      }
      self.set("attemptedTransition", null);
    },
    function(value) {
      self.set("errorMessage", value);
    });
  }
});