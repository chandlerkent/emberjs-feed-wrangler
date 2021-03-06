import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ["login", "unread"],
	streams: [],
	unread: null,
	unreadBinding: "controllers.unread",
	searchTerm: null,
	isLoading: false,

	init: function() {
		this._super();

		this.loadStreams();
	},
	
	loadStreams: function() {
		if (!this.session.get("isAuthenticated")) {
			this.set("streams", []);
			return;
		}
		
		this.set("isLoading", true);
		
		var self = this;
		this.api.getJSONAndTransform(this.api.constructApiUrl("streams/list/"), "streams", function(datum) {
				datum.id = datum.stream_id;
				return datum;
			})
		.then(function(data) {
			self.set("streams", data);
			self.set("isLoading", false);
		}, function() {
			self.set("streams", []);
			self.set("isLoading", false);
		});
	}.observes("this.session.isAuthenticated"),
	
	actions: {
		doSearch: function() {
			this.transitionToRoute("newsfeed-search", this.get("searchTerm"));
		}
	}
});
