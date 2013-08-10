/* globals DelayedWorkController */

require("app/controllers/delayed_work_controller");

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
    var self = this;
    var __super = this._super;
    
    var delayedWork = DelayedWorkController.create({
      timerInterval: self.get("delay")
    });
    
    return delayedWork.scheduleWork()
    .then(function() {
      return __super.call(self, url);
    });
  }
});