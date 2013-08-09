var WorkCoalescingController = Ember.Object.extend({
  _timerID: null,
  timerInterval: 200,
  
  scheduleWork: function(workFn, args) {
    this.cancelPendingWork();
    
    var self = this;
    
    var id = window.setTimeout(function() {
      self.cancelPendingWork();
      workFn.apply(this, args);
    }, this.get("timerInterval"));
    
    this.set("_timerID", id);
  },
  
  cancelPendingWork: function() {
    if (this.get("_timerID") === null) {
      return; 
    }
    
    window.clearTimeout(this.get("_timerID"));
    this.set("_timerID", null);
  }
});