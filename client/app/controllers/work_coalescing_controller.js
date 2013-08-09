var WorkCoalescingController = Ember.Object.extend({
  _timerID: null,
  _deferred: null,
  timerInterval: 200,
  
  init: function() {
    this._super();
    
    this._setupDeferred();
  },
  
  _setupDeferred: function() {
    var deferred = Ember.RSVP.defer();
    
    this.set("_deferred", deferred);
  },
  
  scheduleWork: function() {
    this._cancelPendingWork();
    this._rejectDeferred();
    this._setupDeferred();
    
    var self = this;
    
    var id = window.setTimeout(function() {
      self._cancelPendingWork();
      self.get("_deferred").resolve();
    }, this.get("timerInterval"));
    
    this.set("_timerID", id);
    
    return (this.get("_deferred").promise);
  },
  
  _cancelPendingWork: function() {    
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