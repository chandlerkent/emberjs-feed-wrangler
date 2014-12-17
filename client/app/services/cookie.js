/* global $ */
import Ember from 'ember';

export default Ember.Object.extend({
	remove: $.remove,
	set: $.cookie
});
