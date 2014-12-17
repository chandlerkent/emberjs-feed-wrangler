import FeedItemsBaseRoute from './feed-items-base';

export default FeedItemsBaseRoute.extend({
	model: function() {
		return this.api.getJSONAndTransformIntoEmberObjects(this.api.constructApiUrl("subscriptions/list/"), "feeds", function(sub) {
			sub.id = sub.feed_id;
			sub.isSubscribed = true;
			return sub;
		});
	}
});