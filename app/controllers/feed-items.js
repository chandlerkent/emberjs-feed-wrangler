import Ember from 'ember';

export default Ember.ArrayController.extend({
	isLoading: false,
	loadError: null,
	
	init: function() {
		this.get("unreadCount");
	},
	
	unreadCount: function() {
		var unreadItems = this.filter(function(item) {
			return !item.get("read");
		});
		
		return unreadItems.get("length");
	}.property("this.@each.read"),
	
	hasUnreadItems: function() {
		return (this.get("unreadCount") > 0);
	}.property("unreadCount"),
	
	unselectAllItems: function() {
		this.get("content").forEach(function(item) {
			if (item.get("isSelected")) {
				item.set("isSelected", false);
			}
		});
	},
	
	setSelectedItem: function(model) {
		if (Ember.isEqual(model, this.get("selectedItem"))) {
			return;
		}
		
		this.unselectAllItems();
		
		if (Ember.isNone(model)) {
			return;
		}
		
		model.set("isSelected", true);
		
		this.markItemRead(model);
	},
	
	selectedItem: function() {
		return this.filterProperty("isSelected").get("firstObject");
	}.property("@each.isSelected"),
	
	selectedItemIndex: function() {
		return this.indexOf(this.get("selectedItem"));
	}.property("selectedItem"),
		
	openUrl: function(url) {
		this.openUrlInBackground(url);
	},
	
	openUrlInBackground: function(url) {
		var a = document.createElement('a');
		// Target needed to work with links implementing anchors.
		a.target = '_blank';
		a.href = url;
		
		var evt = document.createEvent('MouseEvents');
		// <https://developer.mozilla.org/en/docs/DOM/event.initMouseEvent>
		evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
		a.dispatchEvent(evt);
	},
		
	openSelectedItem: function() {
		this.openUrl(this.get("selectedItem.url"));
	},
		
	markItemRead: function(model) {
		if (Ember.isNone("model")) {
			return;
		}
			
		if (model.get("read")) {
			return;
		}
		
		this.api.markFeedItemRead(model);
	},
		
	markSelectedItemRead: function() {
		this.markItemRead(this.get("selectedItem"));
	},
		
	toggleItemStarred: function(model) {
		if (Ember.isNone(model)) {
			return; 
		}
		
		this.api.updateFeedItem(model, { starred: !model.get("starred") });   
	},
		
	saveItemToReadLater: function(model) {
		if (Ember.isNone(model)) {
			return; 
		}
		
		if (model.get("read_later")) {
			return; 
		}
		
		this.api.updateFeedItem(model, { read_later: true });
	},
		
	openItem: function(model) {
		if (Ember.isNone(model)) {
			return; 
		}
		
		this.openUrl(model.get("url"));
	},
		
	toggleRead: function(model) {
		if (Ember.isNone(model)) {
			return; 
		}
		
		this.api.updateFeedItem(model, { read: !model.get("read") });
	},
	
	actions: {
		doSelectNextItem: function() {
			if (Ember.isNone(this.get("selectedItem"))) {
				this.setSelectedItem(this.get("firstObject"));
				return;
			}
			
			var newIndex = Math.min((this.get("selectedItemIndex") + 1), (this.get("length") - 1));
			
			if (newIndex === this.get("selectedItemIndex")) {
				window.scrollTo(0, document.height);
			}
			
			this.setSelectedItem(this.objectAt(newIndex));
		},
		
		doSelectPreviousItem: function() {
			if (Ember.isNone(this.get("selectedItem"))) {
				this.setSelectedItem(this.get("lastObject"));
				return;
			}
			
			var newIndex = Math.max((this.get("selectedItemIndex") - 1), 0);
			
			if (newIndex === this.get("selectedItemIndex")) {
				window.scrollTo(0, 0);
			}
			
			this.setSelectedItem(this.objectAt(newIndex));
		},
			
		doSelectItem: function(model) {
			this.setSelectedItem(model);
		},
			
		doOpenItem: function(model) {
			this.openItem(model);
		},
			
		doOpenSelectedItem: function() {
			this.openItem(this.get("selectedItem"));
		},
	
		doSaveItemToReadLater: function(model) {
			this.saveItemToReadLater(model);
		},
			
		doSaveSelectedItemToReadLater: function() {
			this.saveItemToReadLater(this.get("selectedItem"));
		},
					
		doToggleItemStarred: function(model) {
			this.toggleItemStarred(model);
		},
		
		doToggleSelectedItemStarred: function() {
			this.toggleItemStarred(this.get("selectedItem"));
		},
	
		doToggleRead: function(model) {
			this.toggleRead(model);
		},
			
		doToggleSelectedItemRead: function() {
			this.toggleRead(this.get("selectedItem"));
		}
	}
});
