import Ember from 'ember';
import FeedItemsBaseRoute from './feed-items-base';

export default FeedItemsBaseRoute.extend({
	setupParameters: function(controller, model) {
		return { feed_id: model.id };
	},
	
	model: function(params) {
		return this.api.getFeedItems(this.api.constructApiUrl("feed_items/list/", params));
	},
	
	actions: {
		unsubscribe: function(feed) {
			this.api.unsubscribeFromFeed(Ember.get(feed, "id"));
			this.transitionTo("index");
		}
	}
});
