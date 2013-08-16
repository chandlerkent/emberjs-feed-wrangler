App.FeedManageController = Ember.ObjectController.extend({
  isUnsubscribing: false,
  isResubscribing: false,
  
  isWorking: function() {
    return (this.get("isUnsubscribing") || this.get("isResubscribing"));
  }.property("isUnsubscribing", "isResubscribing"),
  
  unsubscribe: function(feed) {
    if (!this.get("isSubscribed")) {
      return;
    }

    this.set("isUnsubscribing", true);
    var self = this;
  
    var promise = App.API.unsubscribeFromFeed(Ember.get(feed, "id"))
    .then(function() {
      self.set("isUnsubscribing", false);
      self.set("isSubscribed", false);
    },
    function() {
      self.set("isUnsubscribing", false);
      self.set("isSubscribed", true);
    });
  },
  
  resubscribe: function(feed) {
    if (this.get("isSubscribed")) {
      return;
    }
    
    this.set("isResubscribing", true);
    
    var self = this;
    var promise = App.API.subscribeToUrl(Ember.get(feed, "feed_url"))
    .then(function() {
      self.set("isResubscribing", false);
      self.set("isSubscribed", true);
    },
    function() {
      self.set("isResubscribing", false);
      self.set("isSubscribed", false);
    });
  }
});