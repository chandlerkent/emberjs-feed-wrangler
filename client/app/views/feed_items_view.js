/* globals Mousetrap */

App.FeedItemsView = Ember.View.extend({
  selectedItemChanged: function() {
    var self = this;
    
    Ember.run.next(function() {
      var selectedElement = self.getSelectedElement();
      if (Ember.isNone(selectedElement)) {
        return;
      }
      self.scrollElementIntoView(selectedElement);
      self.openItemBody(selectedElement);
    });
  }.observes("controller.selectedItem"),
  
  scrollElementIntoView: function(el) {
    el.scrollIntoView(true);
  },
                                      
  openItemBody: function(el) {
    var view = Ember.View.views[$(el).parent(".ember-view").attr("id")];
    view.set("isShowingBody", true);
  },
  
  didInsertElement: function() {
    var self = this;
    
    Mousetrap.bind(["j", "n"], function() {
      self.get("controller").send("selectNextItem");
    });
    
    Mousetrap.bind(["k", "p"], function() {
      self.get("controller").send("selectPreviousItem");
    });
    
    Mousetrap.bind(["s", "l"], function() {
      self.get("controller").send("toggleSelectedItemStar");
    });
    
    Mousetrap.bind("o", function() {
      self.get("controller").send("openSelectedItem");
    });
    
    Mousetrap.bind("m", function() {
      self.get("controller").send("toggleSelectedItemRead");
    });

    Mousetrap.bind("i", function() {
      self.get("controller").send("saveSelectedItemToReadLater");
    });
  },
  
  getSelectedElement: function() {
    var el = $(".stream_item.active");
    if (el.length <= 0) {
      return null;      
    }
    
    return el[0];
  },
  
  getSelectedItem: function() {
    var el = this.getSelectedElement();
    
    var view = Ember.View.views[$(el).attr('id')];
    if (Ember.isNone(view)) {
      return null; 
    }
    
    return view.get("content");
  }
});