import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
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
  this.route('authenticated');
  this.route('feed-items-base');
  this.route('feed-add');
});

export default Router;
