import Ember from 'ember';

export function timeAgo(input) {
  return moment(input * 1000).fromNow();
}

export default Ember.Handlebars.makeBoundHelper(timeAgo);