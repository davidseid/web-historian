var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var qs = require('querystring');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //check req.method , with path of /
  //send them back the index.html, which exists on disk.
  if (req.method === 'GET') {
    if (req.url === '/') {
      helper.serveAssets(res, archive.paths.siteAssets + '/index.html', (data) => {
        res.writeHead(200, helper.headers);
        res.end(data);
      });
    }
  }
  if (req.method === 'POST') {

    //read our sites.txt list, see if present 
    //if so check if workers have added to sites folders
    //if so , return html to client
    //if its in list, but not in sites folder, return status message (check back soon)
    //if its not in the list, add it to the list.
    var body = '';
    req.on('data', (data) => {
      body += data.toString();
    }).on('end', () => {
      console.log(body);
      var post = qs.parse(body);
      archive.addUrlToList(post['url'], (error) => {
        console.log(error);
      });
      res.writeHead(302, 'Found');
      res.end();
    });
  }
};
