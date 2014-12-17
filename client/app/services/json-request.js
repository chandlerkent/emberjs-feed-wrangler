import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Object.extend({
	getJSON: function(url) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			return ajax.getJSON(url).then(resolve, reject);
		});
	}
});
