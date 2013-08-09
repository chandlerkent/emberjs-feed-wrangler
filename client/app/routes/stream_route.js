/* global AuthenticatedRoute, LoadableRoute */

App.StreamRoute = AuthenticatedRoute.extend(LoadableRoute, {
	setupParameters: function(controller, model) {
    return { stream_id: model.id };
	},
	
	model: function(params) {
    return App.API.getFeedItems(App.API.constructApiUrl("streams/stream_items/", params));
	}
});