/* global AuthenticatedRoute, LoadableRoute */

App.UnreadRoute = AuthenticatedRoute.extend(LoadableRoute, {
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", { read: false }));
	}
});