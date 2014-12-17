/* global Mousetrap */
import Ember from 'ember';
var $ = Ember.$;

export default Ember.View.extend({
	init: function() {
		this.get("controller.selectedItem");
	},
	
	selectedItemChanged: function() {
		Ember.run.next(this, function() {
			var el = this.getSelectedElement();
			this.openItemBody(el);
			this.scrollElementIntoView(el);
		});
	}.observes("controller.selectedItem"),
	
	scrollSelectedItemIntoView: function(selectedElement) {
		selectedElement = selectedElement || this.getSelectedElement();
		this.scrollElementIntoView(selectedElement);
	},
		
	scrollSelectedItemIntoViewAndOpenBody: function() {
		var selectedElement = this.getSelectedElement();

		this.scrollSelectedItemIntoView(selectedElement);
		this.openItemBody(selectedElement);
	},
	
	scrollElementIntoView: function(el) {
		if (Ember.isNone(el)) {
			return;
		}
		
		el.scrollIntoView(true);
	},
																			
	openItemBody: function(selectedElement) {
		var view = Ember.View.views[$(selectedElement).parent(".ember-view").attr("id")];
		if (Ember.isNone(view)) {
			return;
		}
 
		view.set("isShowingBody", true);
	},
	
	didInsertElement: function() {    
		var self = this;
		
		Mousetrap.bind(["j", "n"], function() {
			self.get("controller").send("doSelectNextItem");
		});
		
		Mousetrap.bind(["k", "p"], function() {
			self.get("controller").send("doSelectPreviousItem");
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
