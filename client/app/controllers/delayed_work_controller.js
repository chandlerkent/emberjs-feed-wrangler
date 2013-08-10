var DelayedWorkController = Ember.Object.extend({
  _timerID: null,
  _deferred: null,
  timerInterval: 200,
  
  init: function() {
    this._super();
  },
  
  _setupDeferred: function() {
    var deferred = Ember.RSVP.defer();
    
    this.set("_deferred", deferred);
  },
  
  scheduleWork: function() {
    if (!Ember.isNone(this.get("_deferred"))) {
      return (new Ember.RSVP.Promise(function(resolve, reject) {
        throw new Error("Work has already been scheduled.");
      }));
    }
              
    this._setupDeferred();
    
    var self = this;
    
    var id = window.setTimeout(function() {
      self.get("_deferred").resolve();
    }, this.get("timerInterval"));
    
    this.set("_timerID", id);
    
    return (this.get("_deferred").promise);
  },
  
  cancelPendingWork: function() {
    this._rejectDeferred();
    if (this.get("_timerID") === null) {
      return; 
    }
    
    window.clearTimeout(this.get("_timerID"));
    this.set("_timerID", null);
  },
  
  _rejectDeferred: function() {
    if (this.get("_deferred")) {
      this.get("_deferred").reject();
    }
  }
});