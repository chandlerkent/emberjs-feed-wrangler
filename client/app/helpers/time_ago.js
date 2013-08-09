require("dependencies/moment.min.js");

Ember.Handlebars.helper('timeAgo', function(value) {
  return moment(value * 1000).fromNow();
});