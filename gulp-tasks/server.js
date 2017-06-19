const liveServer = require("live-server");
const fs = require('fs');

module.exports = function (gulp, plugins, project) {
	return function () {
		var params = {
			port: 3000, // Set the server port. Defaults to 8080. 
			host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP. usrad-jvs02.qliktech.com
			root: "./dist", // Set root directory that's being served. Defaults to cwd. 
			open: false, // When false, it won't load your browser by default. 
			verbose: true,
			ignore: 'less', // comma-separated string for paths to ignore 
			file: "index.html", // When set, serve this file for every 404 (useful for single-page applications) 
			wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec. 
			// https: {
			// 	key: fs.readFileSync(),
			// 	cert: fs.readFileSync()
			// },
			logLevel: 0, // 0 = errors only, 1 = some, 2 = lots 
			middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack 
		};
		liveServer.start(params);
	}
}