var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //check req.method , with path of /
  //send them back the index.html, which exists on disk.
  if (req.method === 'GET') {
    if (req.url === '/') {
      helper.serveAssets(res, archive.paths.siteAssets + '/index.html', (data) => {
        console.log(data);
        res.writeHead(200, helper.headers);
        res.end(data);
      });
    }
  }
  
  
  // res.end(archive.paths.list);
};
