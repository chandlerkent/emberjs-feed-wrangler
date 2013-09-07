/* global APIController, FeedItemsController, CONFIG */

// Dependencies
require("dependencies/jquery-1.9.1.js");
require("dependencies/handlebars.runtime.js");
require("dependencies/ember-1.0.0-rc.8.js");
require("dependencies/mousetrap.min.js");

// Templates
require("dependencies/compiled/templates");

App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  rootElement: "#app",
  
  removeLoading: function() {
    $("#app .loading").remove();
    $("body.loading").removeClass("loading");
  },
  
  getPreambledConsole: function(preamble) {
    preamble += ":";
    var unshift = [].unshift;
    console = console || function() {};
    return {
      info: function() {
        unshift.call(arguments, preamble);
        console.info.apply(console, arguments); 
      },
      
      log: function() {
        unshift.call(arguments, preamble);
        console.log.apply(console, arguments); 
      },
      
      warn: function() {
        unshift.call(arguments, preamble);
        console.warn.apply(console, arguments); 
      },
      
      error: function() {
        unshift.call(arguments, preamble);
        console.error.apply(console, arguments); 
      }
    };
  }
});

require("app/mixins/mixins.js");
require("app/helpers/helpers.js");
require("app/views/views.js");
require("app/routes/router.js");
require("app/controllers/controllers.js");

App.API = APIController.create({
  baseUrl: "/fw/api/v2/",
  clientKey: CONFIG.client_key
});

App.NewsfeedController = App.NewsfeedSearchController = App.StarredController = App.FeedController = App.StreamController = FeedItemsController.extend({
  
});

/*
App.LoadingRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    console.log("RENDER_TEMPLATE");
    
    this.render("loading", {
      into: "application",
      outlet: "main"
    });
  }
});
*/
