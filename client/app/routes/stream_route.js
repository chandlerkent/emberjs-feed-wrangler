App.StreamRoute = AuthenticatedRoute.extend(App.LoadableRoute, {
	setupParameters: function(controller, model) {
    return { stream_id: model.id };
	},
	
	model: function(params) {
    return App.API.getFeedItems(App.API.constructApiUrl("streams/stream_items/", params));
	}
});