import Ember from 'ember';

export default Ember.Object.extend({
	removeCookie: Ember.$.removeCookie,
	setCookie: Ember.$.cookie,
	getCookie: Ember.$.cookie
});
