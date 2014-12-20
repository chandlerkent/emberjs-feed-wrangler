import Ember from 'ember';

export default Ember.Controller.extend({
	email: null,
	password: null,
	errorMessage: null,
	attemptedTransition: null,
	shouldRememberLogin: false,
	isWorking: false,
	
	reset: function() {
		this.setProperties({
			email: "",
			password: "",
			errorMessage: "",
			shouldRememberLogin: false,
			attemptedTransition: null,
			isWorking: false
		});
	},
	
	actions: {
		login: function() {    
			this.set("errorMessage", "");
			this.set("isWorking", true);
			
			var self = this;
			this.api
				.getJSON(this.api.constructApiUrl("users/authorize/", { email: this.get("email"), password: this.get("password") }))
				.then(
					function(response) {
						self.session.didSucceedLogin(response, self.get("shouldRememberLogin"));
						self.set("errorMessage", "");
						var transition = self.get("attemptedTransition");
						if (!Ember.isNone(transition)) {
							transition.retry();
						} else {
							self.transitionToRoute("index");
						}
						self.set("attemptedTransition", null);
					},
					function(err) {
						self.session.didFailLogin(err);
						self.set("errorMessage", err);
						self.set("isWorking", false);
					}
				);
		}
	}
});
