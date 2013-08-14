/* global FeedItemsBaseRoute */

App.FeedRoute = FeedItemsBaseRoute.extend({
	setupParameters: function(controller, model) {
    return { feed_id: model.id };
  },
	
	model: function(params) {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", params));
	}
});