/* globals Mousetrap */

App.FeedItemsView = Ember.View.extend({
  init: function() {
    this.get("controller.selectedItem");
  },
  
  selectedItemChanged: function() {
    Ember.run.next(this, function() {
      var el = this.getSelectedElement();
      this.openItemBody(el);
    });
  }.observes("controller.selectedItem"),
  
  scrollSelectedItemIntoView: function() {
    var selectedElement = this.getSelectedElement();
    if (Ember.isNone(selectedElement)) {
      return;
    }
    this.scrollElementIntoView(selectedElement);
  },
  
  scrollElementIntoView: function(el) {
    el.scrollIntoView(true);
  },
                                      
  openItemBody: function(el) {
    var view = Ember.View.views[$(el).parent(".ember-view").attr("id")];
    if (Ember.isNone(view)) {
      return;
    }
 
    view.set("isShowingBody", true);
  },
  
  didInsertElement: function() {    
    var self = this;
    
    Mousetrap.bind(["j", "n"], function() {
      self.get("controller").send("doSelectNextItem");
      Ember.run.next(self, self.scrollSelectedItemIntoView);
    });
    
    Mousetrap.bind(["k", "p"], function() {
      self.get("controller").send("doSelectPreviousItem");
      Ember.run.next(self, self.scrollSelectedItemIntoView);
    });
    
    Mousetrap.bind(["s", "l"], function() {
      self.get("controller").send("doToggleSelectedItemStarred");
    });
    
    Mousetrap.bind("o", function() {
      self.get("controller").send("doOpenSelectedItem");
    });
    
    Mousetrap.bind("m", function() {
      self.get("controller").send("doToggleSelectedItemRead");
    });

    Mousetrap.bind("i", function() {
      self.get("controller").send("doSaveSelectedItemToReadLater");
    });
  },
  
  getSelectedElement: function() {
    var el = $(".stream_item.active");
    if (el.length <= 0) {
      return null;      
    }
    
    return el[0];
  }
});