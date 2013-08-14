var LoadableRoute = Ember.Mixin.create({
  setupParameters: function(controller, model) {
    return {}; 
  },
  
  modelIsResolved: function(model) {
    return (!Ember.isNone(model) && Ember.isArray(model));
  },
  
  setupController: function(controller, model) {
    if (this.modelIsResolved(model)) {
      this._super(controller, model);
      return;
    }
    
    controller.set("model", []);
    controller.set("isLoading", true);
    var params = this.setupParameters(controller, model);
    this.model(params)
    .then(function(data) {
      controller.setProperties({
        "isLoading": false,
        "loadError": null,
        "model": data
      });
    }, function(error) {
      controller.setProperties({
        "isLoading": false,
        "loadError": "Error: " + error,
        "model": []
      });
    });
  }
});