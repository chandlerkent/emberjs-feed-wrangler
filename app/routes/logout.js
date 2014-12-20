import Ember from 'ember';

export default Ember.Route.extend({
	activate: function() {
		this.session.logOut();
		
		this.transitionTo("index");
	}
});
