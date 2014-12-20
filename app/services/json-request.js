/* global $ */
import Ember from 'ember';


export default Ember.Object.extend({
	getJSON: function(url) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			return $.getJSON(url).then(resolve, reject);
		});
	}
});
