import Ember from 'ember';

export default Ember.Route.extend({
	renderTemplate: function() {
		this._super();
		
		// Don't block this render
		Ember.run.next(this, function() {
			this.render("sidebar", {
				outlet: "sidebar",
				into: "application",
				controller: this.controllerFor("sidebar")
			});
		});
	},
	
	actions: {
		markAllRead: function(models) {
			var cachedModels = {};
			var ids = [];
			var cachedStatuses = {};
			
			models.forEach(function(model) {
				var id = model.get("id");
				if (!model.get("read")) {
					ids.push(id);
				}
				cachedStatuses[id] = model.get("read");
				cachedModels[id] = model;
				model.set("read", true);
			});
			
			if (ids.length <= 0) {
				return; 
			}
			
			this.api
				.markFeedItemsRead(ids)
				.then(
					function(results) {
						results.forEach(function(result) {
							var cachedModel = cachedModels[result.feed_item_id];
							if (!cachedModel) {
								return;
							}
							cachedModel.setProperties(result);
						});
					},
					function() {
						models.forEach(function(model) {
							model.set("read", cachedStatuses[model.get("id")]);
						});
					}
				);
		}
	}
});
