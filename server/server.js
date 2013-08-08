var http = require('http'),
    httpProxy = require('http-proxy'),
    statik = require("statik");

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

//
// Create a proxy server with custom application logic
//
var s = httpProxy.createServer(function (req, res, proxy) {
  if (req.url.indexOf("/fw") === 0) {
    req.url = req.url.replace("/fw", "");
    console.log("Proxying to Feed Wrangler", req.url);
    proxy.proxyRequest(req, res, {
      host: CONFIG.FEED_WRANGLER.HOST,
      port: CONFIG.FEED_WRANGLER.PORT
    });
  }
  else if (req.url === "/config.js") {
    res.write("CONFIG = { client_key: '" + CONFIG.FEED_WRANGLER.CLIENT_KEY + "' };");
    res.end();
  }
  else {
    console.log("Proxying to static site", req.url);
    proxy.proxyRequest(req, res, {
      host: CONFIG.STATIC_SERVER.HOST,
      port: CONFIG.STATIC_SERVER.PORT
    });
  }
});

s.listen(CONFIG.PORT, CONFIG.HOST);

s.on("listening", function() {
  console.log("LISTENING", CONFIG);
});

statik({
    port: CONFIG.STATIC_SERVER.PORT,
    root: CONFIG.STATIC_SERVER.ROOT
});