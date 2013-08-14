/* global FeedItemsBaseRoute */

App.UnreadRoute = FeedItemsBaseRoute.extend({
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", { read: false }));
	}
});