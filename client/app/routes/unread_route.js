App.UnreadRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
	model: function() {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/list/", { read: false }));
	}
});