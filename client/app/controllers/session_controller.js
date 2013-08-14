require("dependencies/jquery.cookie");

App.AUTH_COOKIE = {
  NAME: "AUTH",
  PATH: "/",
  EXPIRES: 30
};

App.SessionController = Ember.Object.extend({
  apiToken: "",
  shouldRememberCredentials: false,
  
  isAuthenticated: function() {
    return (!Ember.isEmpty(this.get("apiToken"))); 
  }.property("apiToken"),
  
  apiTokenChanged: function() {
    if (Ember.isEmpty(this.get("apiToken"))) {
      $.removeCookie(App.AUTH_COOKIE.NAME, { path: App.AUTH_COOKIE.PATH });
    } else {
      var options = {
        path: App.AUTH_COOKIE.PATH
      };
      
      if (this.get("shouldRememberCredentials")) {
        options.expires = App.AUTH_COOKIE.EXPIRES;
      }
      
      $.cookie(App.AUTH_COOKIE.NAME, this.get("apiToken"), options);
    }
  }.observes("apiToken"),
  
  logIn: function(email, password, shouldRememberCredentials) {
    var deferred = Ember.RSVP.defer();
    var self = this;
    
    this.set("shouldRememberCredentials", shouldRememberCredentials);
    
    App.API.getJSON(App.API.constructApiUrl("users/authorize/", { email: email, password: password }))
    .then(function(response) {
      self.set("apiToken", response["access_token"]);
      deferred.resolve(response["user"]);
    },
    function(value) {
      self.set("apiToken", null);
      deferred.reject(value);
    });
    
    return deferred.promise;
  },
    
  logOut: function() {
    if (Ember.isEmpty(this.get("apiToken"))) {
      return;   
    }
    
    var previousToken = this.get("apiToken");
    this.set("apiToken", null);
    
    App.API.getJSON(App.API.constructApiUrl("users/logout/", { "access_token": previousToken }));
  }
}).create({
  apiToken: $.cookie(App.AUTH_COOKIE.NAME)
});