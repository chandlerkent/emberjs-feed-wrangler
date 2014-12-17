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
			this.session.logIn(this.get("email"), this.get("password"), this.get("shouldRememberLogin"))
			.then(
				function() {
					self.set("errorMessage", "");
					
					var transition = self.get("attemptedTransition");
					if (!Ember.isNone(transition)) {
						transition.retry();
					} else {
						self.transitionToRoute("index");
					}
					self.set("attemptedTransition", null);
				},
				function(error) {
					self.set("errorMessage", error);
					self.set("isWorking", false);
				}
			);
		}
	}
});
