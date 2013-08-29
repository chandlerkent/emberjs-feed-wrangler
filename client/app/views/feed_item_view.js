App.FeedItemView = Ember.View.extend({
  templateName: "feedItem",
  isShowingBody: false,
  
	toggleBodyVisibility: function() {
		this.toggleProperty("isShowingBody");
  },
  
  click: function(evt) {
    evt.stopPropagation();
    
    if ($(evt.target).closest(".stream_item-title").length > 0) {
      this.toggleBodyVisibility();
    }
    
    this.get("controller").send("selectItem", this.get("content"));
  }
});