/* global Mousetrap */
import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		//App.removeLoading();
		
		this.setupKeyboardSupport();
	},
	
	setupKeyboardSupport: function() {
		var self = this;
		
		Mousetrap.bind("g s", function() {
			self.get("controller").send("doTransitionToStarredRoute");
		});
		
		Mousetrap.bind(["g h", "g u"], function() {
			self.get("controller").send("doTransitionToIndexRoute");
		});
	}
});
