import Ember from 'ember';

var AUTH_COOKIE = {
  NAME: "AUTH",
  PATH: "/",
  EXPIRES: 30
};

export default Ember.Object.extend({
	apiToken: "",
	shouldRememberCredentials: false,
	
	init: function() {
		this.set("apiToken", this.cookie.getCookie(AUTH_COOKIE.NAME));
	},
	
	isAuthenticated: function() {
		return (!Ember.isEmpty(this.get("apiToken"))); 
	}.property("apiToken"),
	
	apiTokenChanged: function() {
		if (Ember.isEmpty(this.get("apiToken"))) {
			this.cookie.removeCookie(AUTH_COOKIE.NAME, { path: AUTH_COOKIE.PATH });
		} else {
			var options = {
				path: AUTH_COOKIE.PATH
			};
			
			if (this.get("shouldRememberCredentials")) {
				options.expires = AUTH_COOKIE.EXPIRES;
			}
			
			this.cookie.setCookie(AUTH_COOKIE.NAME, this.get("apiToken"), options);
		}
	}.observes("apiToken"),
	
	didSucceedLogin: function(response, shouldRememberCredentials) {		
		this.set("shouldRememberCredentials", shouldRememberCredentials);
		
		this.set("apiToken", response["access_token"]);
		
		return response["user"];
	},
	
	didFailLogin: function() {
		this.set("apiToken", null);
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
