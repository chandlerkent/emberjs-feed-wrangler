var FeedItemsController = Ember.ArrayController.extend({
  isLoading: false,
  loadError: null,
  
  unselectAllItems: function() {
    this.get("content").forEach(function(item) {
      if (item.get("isSelected")) {
        item.set("isSelected", false);
      }
    });
  },
  
  didSelectItem: function(model) {
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
  
  selectNextItem: function() {
    if (Ember.isNone(this.get("selectedItem"))) {
      this.didSelectItem(this.get("firstObject"));
      return;
    }
    
    var newIndex = Math.min((this.get("selectedItemIndex") + 1), (this.get("length") - 1));
    
    this.didSelectItem(this.objectAt(newIndex));
  },
  
  selectPreviousItem: function() {
    if (Ember.isNone(this.get("selectedItem"))) {
      this.didSelectItem(this.get("lastObject"));
      return;
    }
    
    var newIndex = Math.max((this.get("selectedItemIndex") - 1), 0);
    
    this.didSelectItem(this.objectAt(newIndex));
  },
    
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
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false,
                       false, false, 0, null);
    a.dispatchEvent(evt);
  },
    
  openItem: function(model) {
    if (Ember.isNone(model)) {
      return; 
    }
    
    this.openUrl(model.get("url"));
  },
    
  openSelectedItem: function() {
    this.openItem(this.get("selectedItem"));
  },
    
  markItemRead: function(model) {
    if (Ember.isNone("model")) {
      return;
    }
      
    if (model.get("read")) {
      return;
    }
    
    App.API.markFeedItemRead(model);
  },
    
  markSelectedItemRead: function() {
    var model = this.get("selectedItem");
    
    App.API.markFeedItemRead(this.get("selectedItem"));
  },

  saveItemToReadLater: function(model) {
    if (Ember.isNone(model)) {
      return; 
    }
    
    if (model.get("read_later")) {
      return; 
    }
        
    App.API.updateFeedItem(model, { read_later: true });
  },
    
  saveSelectedItemToReadLater: function() {
    this.saveItemToReadLater(this.get("selectedItem"));
  },
        
  toggleItemStarred: function(model) {
    if (Ember.isNone(model)) {
      return; 
    }
    
    App.API.updateFeedItem(model, { starred: !model.get("starred") });
  },
  
  toggleSelectedItemStarred: function() {
    this.toggleItemStarred(this.get("selectedItem"));
  },

  toggleRead: function(model) {
    if (Ember.isNone(model)) {
      return; 
    }
    
    App.API.updateFeedItem(model, { read: !model.get("read") });
  },
    
  toggleSelectedItemRead: function() {
    this.toggleRead(this.get("selectedItem"));
  }
});