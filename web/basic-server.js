var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var worker = require('../workers/htmlfetcher.js');
var CronJob = require('cron').CronJob;

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8081;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);



if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
  new CronJob('30 * * * * *', function() {
    worker.doWork();
  }, null, true);
}




