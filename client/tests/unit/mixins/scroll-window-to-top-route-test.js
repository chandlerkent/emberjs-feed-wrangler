import Ember from 'ember';
import ScrollWindowToTopRouteMixin from 'emberjs-feed-wrangler/mixins/scroll-window-to-top-route';

module('ScrollWindowToTopRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var ScrollWindowToTopRouteObject = Ember.Object.extend(ScrollWindowToTopRouteMixin);
  var subject = ScrollWindowToTopRouteObject.create();
  ok(subject);
});
