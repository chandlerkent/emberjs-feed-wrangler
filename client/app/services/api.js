import Ember from 'ember';
import JSONRequestService from './json-request';
import config from '../config/environment';

export default JSONRequestService.extend({
	baseUrl: config.apiBaseUrl,
	clientKey: config.feedWranglerApiKey,
	
	buildQueryStringFromObject: function(params) {
		var qsParams = [];
		for (var param in params) {
			if (!params.hasOwnProperty(param)) {
				continue;
			}
			if (Ember.isEmpty(params[param])) {
				continue;
			}
			qsParams.push({key: param, value: params[param]});
		}
		
		var qsString = qsParams.map(function(param) { return encodeURIComponent(param.key) + "=" + encodeURIComponent(param.value); }).join("&");
		
		return qsString;
	},
	
	constructApiUrl: function(path, params) {
		var c = this.logger.getPreambledConsole("APIController.constructApiUrl");
		
		params = params || {};
		params["access_token"] = params["access_token"] || this.session.get("apiToken");
		params["client_key"] = params["client_key"] || this.get("clientKey");
		var url = "%@%@?%@".fmt(this.get("baseUrl"), path, this.buildQueryStringFromObject(params));
		
		c.info(url);
		
		return url;
	},
	
	_testSuccess: function(wait) {
		wait = wait || 2000;
		
		return Ember.RSVP.Promise(function(resolve) { window.setTimeout(function() { resolve(true); }, wait); });
	},
	
	_testFailure: function(wait) {
		wait = wait || 2000;
		
		return Ember.RSVP.Promise(function(resolve) { window.setTimeout(function() { resolve(true); }, wait); });
	},
	
	_testRandom: function(wait) {
		wait = wait || 2000;
		
		return Ember.RSVP.Promise(function(resolve, reject) {
			window.setTimeout(function() { 
				var random = Math.floor(Math.random()*1001);
				if (random % 2) {
					resolve(true);
				}
				else {
					reject(false);
				}
			}, wait);
		});
	},
	
	getJSON: function(url, part) {
		var c = this.logger.getPreambledConsole("APIController.getJSON");
		
		var deferred = Ember.RSVP.defer();
		
		var promise = this._super(url);
		promise.then(function(data) {
			c.log("received", data);
			if (data.error === null) {
				if (part && data.hasOwnProperty(part)) {
					c.log("returning only", part);
					data = data[part];
				}
				deferred.resolve(data);
			}
			else {
				c.error("bad request", data);
				deferred.reject(data.error); 
			}
		});
		promise.then(null, function(data) {
			c.error("unknown error", data);
			deferred.reject({ error: "Unknown failure" });
		});
		
		return deferred.promise;
	},
	
	getJSONAndTransform: function(url, part, mapFn) {
		return this.getJSON(url, part)
			.then(function(data) {
				return data.map(mapFn);
			});
	},
	
	getJSONAndTransformIntoEmberObjects: function(url, part, mapFn) {
		return this.getJSONAndTransform(url, part, mapFn)
		.then(function(data) {
			return data.map(function(datum) {
				return Ember.Object.create(datum);
			});
		});
	},
	
	getFeedItems: function(url, part) {
		part = part || "feed_items";
		return this.getJSONAndTransformIntoEmberObjects(url, part, function(datum) {
			datum.id = datum.feed_item_id;
			datum.feed = {
				id: datum.feed_id
			};
			return datum;
		});
	},
	
	updateFeedItem: function(model, props) {
		var self = this;
		var promise = new Ember.RSVP.Promise(function(resolve, reject) {
			var dataOrig = model.getProperties("feed_item_id", "read_later", "starred", "read");
			var dataNew = Ember.copy(dataOrig, true);
			for (var prop in props) {
				dataNew[prop] = props[prop];
			}
			model.setProperties(props);
			self.getJSON(self.constructApiUrl("feed_items/update/", dataNew), "feed_item")
			.then(function() {
				resolve(model);
			}, function(error) {
				model.setProperties(dataOrig);
				reject(error);   
			});
		});
		
		return promise;
	},
		
	markFeedItemRead: function(model) {
		model.set("read", true);
		
		return this.markFeedItemsRead([model.get("id")]);
	},
	
	markFeedItemsRead: function(feedItemIds) {
		if (feedItemIds.length <= 0) {
			return new Ember.RSVP.Promise(function(resolve) {
				resolve();
			});
		}
		
		return this.getJSON(this.constructApiUrl("feed_items/mark_all_read", { feed_item_ids: feedItemIds.join(",") }), "feed_items");
	},
	
	unsubscribeFromFeed: function(feedId) {
		var data = { "feed_id": feedId };
		
		return this.getJSON(this.constructApiUrl("subscriptions/remove_feed/", data));
	},
	
	subscribeToUrl: function(url) {
		var data = { "feed_url": url };
		
		return this.getJSON(this.constructApiUrl("/subscriptions/add_feed/", data));
	}
});
