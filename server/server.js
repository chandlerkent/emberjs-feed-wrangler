var http = require('http');
var httpProxy = require('http-proxy');
var static = require("node-static");
var CONFIG = require("./config");

var fileServer = new static.Server(CONFIG.STATIC_SERVER.ROOT);
var proxyServer = new httpProxy.createProxyServer({ target: CONFIG.FEED_WRANGLER.TARGET });

var server = http.createServer(function (req, res, proxy) {
	console.log("URL: [" + req.url + "]");
  if (req.url.indexOf("/fw") === 0) {
    req.url = req.url.replace("/fw", "");
    console.log("Proxying to Feed Wrangler", req.url);
    proxyServer.web(req, res);
  }
  else {
    console.log("Proxying to static site", req.url);
    fileServer.serve(req, res);
  }
});

server.listen(CONFIG.PORT, CONFIG.HOST);

server.on("listening", function() {
  console.log("LISTENING", CONFIG.PORT, CONFIG.HOST);
});

console.log("CONFIG:", CONFIG);