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
  
  markItemRead: function(model) {
    if (model.get("read")) {
      return;
    }
    
    App.API.markFeedItemRead(model);
  },
  
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
    
  openSelectedItem: function() {
    this.openUrl(this.get("selectedItem").get("url"));
  },
    
  saveSelectedItemToReadLater: function() {
    var model = this.get("selectedItem");
    if (model.get("read_later")) {
      return; 
    }
        
    App.API.updateFeedItem(model, { read_later: true });
  },
        
  toggleStar: function(model) {
    App.API.updateFeedItem(model, { starred: !model.get("starred") });
  },
  
  toggleSelectedItemStar: function() {
    this.toggleStar(this.get("selectedItem"));
  },

  toggleRead: function(model) {
    App.API.updateFeedItem(model, { read: !model.get("read") });
  },
    
  toggleSelectedItemRead: function(model) {
    this.toggleRead(this.get("selectedItem"));
  }
});