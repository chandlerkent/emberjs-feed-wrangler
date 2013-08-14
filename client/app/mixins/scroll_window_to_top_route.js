var ScrollWindowToTopRoute = Ember.Mixin.create({
  activate: function() {
    console.log("HERE", arguments);
    this._super();
    window.scrollTo(0, 0);
  }
});