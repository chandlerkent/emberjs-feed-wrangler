import FeedItemsBaseRoute from './feed-items-base';

export default FeedItemsBaseRoute.extend({
	setupParameters: function(controller, model) {
    return { stream_id: model.id };
	},
	
	model: function(params) {
    return this.api.getFeedItems(this.api.constructApiUrl("streams/stream_items/", params));
	}
});
