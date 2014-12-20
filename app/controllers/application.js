import Ember from 'ember';

export default Ember.Controller.extend({
	needs: "unread",
	unread: null,
	unreadBinding: "controllers.unread",
	
	init: function() {
		this._super();
		
		// to make sure the title observer is fired
		this.get("title");
	},
	
	title: function() {
		return "Feed Wrangler (%@)".fmt(this.get("controllers.unread.unreadCount"));
	}.property("controllers.unread.unreadCount"),
	
	titleChanged: function() {
		document.title = this.get("title");
	}.observes("title"),

	actions: {
		doTransitionToStarredRoute: function() {
			this.transitionToRoute("starred");
		},
		
		doTransitionToIndexRoute: function() {
			this.transitionToRoute("index"); 
		}
	}
});
