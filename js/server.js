// Server for local testing.
var connect = require('connect');
var serveStatic = require('serve-static');
var server = connect();
console.log(__dirname + '/../index.html');
server.use(serveStatic( __dirname + '/../'));
server.use(serveStatic( __dirname + '/bundle.js'));
server.use(serveStatic( __dirname + '/pixi.js'));
server.use(serveStatic( __dirname + '/../processing/wordGalaxy.json'));
server.listen(8080);
console.log("Serving on port 8080..");