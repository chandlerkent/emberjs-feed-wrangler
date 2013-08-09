/* global AuthenticatedRoute, LoadableRoute */

App.StarredRoute = AuthenticatedRoute.extend(LoadableRoute, {
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", { starred: true }));
	}
});
