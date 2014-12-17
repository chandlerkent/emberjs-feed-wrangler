import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

// App.API = APIController.create({
//   baseUrl: "/fw/api/v2/",
//   clientKey: CONFIG.client_key
// });

// removeLoading: function() {
//     $("#app .loading").remove();
//     $("body.loading").removeClass("loading");
//   },
