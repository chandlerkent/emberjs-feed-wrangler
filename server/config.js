var defaults = require("./defaults.json");

var CONFIG = {
  PORT: process.env.SERVER_PORT,
  HOST: process.env.SERVER_HOST,
  FEED_WRANGLER: {
    PORT: process.env.FEED_WRANGLER_PORT,
    HOST: process.env.FEED_WRANGLER_HOST,
    CLIENT_KEY: process.env.FEED_WRANGLER_CLIENT_KEY
  },
  STATIC_SERVER: {
    PORT: process.env.STATIC_SERVER_PORT,
    HOST: process.env.STATIC_SERVER_HOST,
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

var final = mergeDefaults(CONFIG, defaults);

module.exports = final;