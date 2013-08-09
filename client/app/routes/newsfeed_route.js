/* global AuthenticatedRoute, LoadableRoute */

App.NewsfeedRoute = AuthenticatedRoute.extend(LoadableRoute, {
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/"));
	}
});
