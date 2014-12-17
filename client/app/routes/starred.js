import FeedItemsBaseRoute from './feed-items-base';

export default FeedItemsBaseRoute.extend({
	model: function() {
		return this.api.getFeedItems(this.api.constructApiUrl("feed_items/list/", { starred: true }));
	}
});
