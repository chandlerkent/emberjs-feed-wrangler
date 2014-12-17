import FeedItemsBaseRoute from './feed-items-base';

export default FeedItemsBaseRoute.extend({
	setupParameters: function(controller, model) {
		return { search_term: model };
	},
	
	model: function(params) {
		return this.api.getFeedItems(this.api.constructApiUrl("feed_items/search/", params));
	}
});