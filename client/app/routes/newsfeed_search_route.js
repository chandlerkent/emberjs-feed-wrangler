/* global AuthenticatedRoute, LoadableRoute */

App.NewsfeedSearchRoute = AuthenticatedRoute.extend(LoadableRoute, {
  setupParameters: function(controller, model) {
    return { search_term: model };
  },
  
	model: function(params) {
    return App.API.getFeedItems(App.API.constructApiUrl("feed_items/search/", params));
	}
});