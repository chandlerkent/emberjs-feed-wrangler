import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(transition) {
		var c = this.logger.getPreambledConsole("AuthenticatedRoute.beforeModel");
		
		if (!this.session.get("isAuthenticated")) {
			c.warn("Not authenticated");
			this.controllerFor("login").set("attemptedTransition", transition);
			this.transitionTo("login");
		}
	}
});
