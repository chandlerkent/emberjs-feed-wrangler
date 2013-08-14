/* global FeedItemsBaseRoute */

App.StarredRoute = FeedItemsBaseRoute.extend({
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", { starred: true }));
	}
});
