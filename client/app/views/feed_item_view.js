App.FeedItemView = Ember.View.extend({
  templateName: "feedItem",
  isShowingBody: false,
  
	toggleBodyVisibility: function() {
		this.toggleProperty("isShowingBody");
  },
  
  click: function() {
    this.toggleBodyVisibility();
  }
});