import Ember from 'ember';
import Cookie from './cookie';

var AUTH_COOKIE = {
  NAME: "AUTH",
  PATH: "/",
  EXPIRES: 30
};

export default Ember.Object.extend({
	apiToken: "",
	shouldRememberCredentials: false,
	
	isAuthenticated: function() {
		return (!Ember.isEmpty(this.get("apiToken"))); 
	}.property("apiToken"),
	
	apiTokenChanged: function() {
		if (Ember.isEmpty(this.get("apiToken"))) {
			Cookie.remove(AUTH_COOKIE.NAME, { path: AUTH_COOKIE.PATH });
		} else {
			var options = {
				path: AUTH_COOKIE.PATH
			};
			
			if (this.get("shouldRememberCredentials")) {
				options.expires = AUTH_COOKIE.EXPIRES;
			}
			
			Cookie.set(AUTH_COOKIE.NAME, this.get("apiToken"), options);
		}
	}.observes("apiToken"),
	
	logIn: function(email, password, shouldRememberCredentials) {
		var deferred = Ember.RSVP.defer();
		var self = this;
		
		this.set("shouldRememberCredentials", shouldRememberCredentials);
		
		this.api.getJSON(this.api.constructApiUrl("users/authorize/", { email: email, password: password }))
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
		
		this.api.getJSON(this.api.constructApiUrl("users/logout/", { "access_token": previousToken }));
	}
});
