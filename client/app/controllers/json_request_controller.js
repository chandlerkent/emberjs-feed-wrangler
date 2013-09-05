var JSONRequestController = Ember.Object.extend({
  getJSON: function(url) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return $.getJSON(url)
      .done(resolve)
      .fail(reject);
    });
  }
});

var DelayedJSONRequestController = JSONRequestController.extend({
  delay: 5000,
  
  getJSON: function(url) {
    var __super = this._super;
    
    var deferred = Ember.RSVP.defer();
    
    Ember.run.later(this, function() {
      __super.call(this, url).then(deferred.resolve, deferred.reject);
    }, this.get("delay"));
    
    return deferred.promise; 
  }
});