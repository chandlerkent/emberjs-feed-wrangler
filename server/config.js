/* global process, module */

var defaults = require("./defaults.json");

var CONFIG = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  FEED_WRANGLER: {
    PORT: process.env.FEED_WRANGLER_PORT,
    HOST: process.env.FEED_WRANGLER_HOST,
    CLIENT_KEY: process.env.FEED_WRANGLER_CLIENT_KEY
  },
  STATIC_SERVER: {
    ROOT: process.env.STATIC_SERVER_ROOT
  }
};

var naiveIsObject = function naiveIsObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"; 
};

var isEmpty = function isEmpty(obj) {
  return (obj === null || obj === undefined || obj === "");
};

var mergeDefaults = function mergeDefaults(config, defaults, _result) {
  _result = _result || {};
  
  for (var prop in config) {
    if (!isEmpty(config[prop])) {
      if (naiveIsObject(config[prop])) {
        _result[prop] = {};
        mergeDefaults(config[prop], defaults[prop], _result[prop]);
        continue;
      }
      
      _result[prop] = config[prop];
      continue;
    }
    
    if (!isEmpty(defaults[prop])) {
      _result[prop] = defaults[prop];
    }
  }
  
  return _result;
};

var merged = mergeDefaults(CONFIG, defaults);

module.exports = merged;