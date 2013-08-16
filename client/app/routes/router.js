require("app/routes/application_route.js");
require("app/routes/authenticated_route.js");
require("app/routes/feed_items_base_route");
require("app/routes/feed_route.js");
require("app/routes/index_route.js");
require("app/routes/login_route.js");
require("app/routes/logout_route.js");
require("app/routes/newsfeed_route.js");
require("app/routes/newsfeed_search_route.js");
require("app/routes/starred_route.js");
require("app/routes/feeds_add_route");
require("app/routes/feeds_manage_route");
require("app/routes/stream_route.js");
require("app/routes/unread_route.js");

App.Router.map(function() {
	this.resource('stream', { path: '/streams/:stream_id' });
  this.resource("feed", { path: "/newsfeed/feed/:feed_id" });
  this.route("unread");
  this.route("newsfeed");
  this.route("newsfeed-search", { path: "/newsfeed/search/:search_term" });
  this.route("starred");
  this.route("feeds-add", { path: "/feeds/add" });
  this.route("feeds-manage", { path: "/feeds/manage" });
  this.route("login");
  this.route("logout");
});