App.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    App.removeLoading();
  }
});