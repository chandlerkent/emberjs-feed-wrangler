import Ember from 'ember';
import ScrollWindowToTopRoute from '../mixins/scroll-window-to-top-route';

export default Ember.Route.extend(ScrollWindowToTopRoute, {
	redirect: function() {
		if (this.session.get("isAuthenticated")) {
			this.transitionTo("index"); 
		}
	},
	
	setupController: function(controller) {
		controller.reset(); 
	}
});
