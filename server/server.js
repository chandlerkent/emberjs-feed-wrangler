var http = require('http');
var httpProxy = require('http-proxy');
var statik = require("statik");
var CONFIG = require("./config");

console.log("CONFIG:", CONFIG);

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
    var clientConfig = {
      "client_key": CONFIG.FEED_WRANGLER.CLIENT_KEY
    };
    res.setHeader("Content-Type", "application/javascript");
    res.write("CONFIG = " + JSON.stringify(clientConfig) + ";");
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
  console.log("LISTENING", CONFIG.PORT, CONFIG.HOST);
});

statik({
    port: CONFIG.STATIC_SERVER.PORT,
    root: CONFIG.STATIC_SERVER.ROOT
});