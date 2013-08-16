/* globals FeedItemsBaseRoute */

App.FeedsManageRoute = FeedItemsBaseRoute.extend({
	model: function() {
    return App.API.getJSONAndTransformIntoEmberObjects(App.API.constructApiUrl("subscriptions/list/"), "feeds", function(sub) {
      sub.id = sub.feed_id;
      sub.isSubscribed = true;
      return sub;
    });
	}
});