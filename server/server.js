var http = require('http');
var httpProxy = require('http-proxy');
var static = require("node-static");
var CONFIG = require("./config");

console.log("CONFIG:", CONFIG);

var fileServer = new static.Server(CONFIG.STATIC_SERVER.ROOT);

var s = httpProxy.createServer(function (req, res, proxy) {
	console.log("URL: [" + req.url + "]");
  if (req.url.indexOf("/fw") === 0) {
    req.url = req.url.replace("/fw", "");
    console.log("Proxying to Feed Wrangler", req.url);
    proxy.proxyRequest(req, res, {
      host: CONFIG.FEED_WRANGLER.HOST,
      port: CONFIG.FEED_WRANGLER.PORT
    });
  }
  else {
    console.log("Proxying to static site", req.url);
    fileServer.serve(req, res);
  }
});

s.listen(CONFIG.PORT, CONFIG.HOST);

s.on("listening", function() {
  console.log("LISTENING", CONFIG.PORT, CONFIG.HOST);
});