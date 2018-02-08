var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var qs = require('querystring');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //check req.method , with path of /
  //send them back the index.html, which exists on disk.
  if (req.method === 'GET') {
    if (req.url.length > 1) {
      // if (req.url.indexOf('.') !== -1) {
      //   return;
      // }
      console.log(req.url);
      // var wrappedUrl = `www.${req.url.slice(1)}.com`;
      var wrappedUrl = req.url;
      archive.isUrlArchived(wrappedUrl, (isArchived) => {
        if (isArchived) {
          helper.serveAssets(res, archive.paths.archivedSites + '/' + wrappedUrl, (data) => {
            if (data) {
              res.writeHead(200, helper.headers);
              res.write(data);
              res.end();
            }
          });
        } else {
          res.writeHead(404, 'Nonexistent file');
          res.end();
        }
      });

    } else {
      helper.serveAssets(res, archive.paths.siteAssets + '/index.html', (data) => {
        res.writeHead(200, helper.headers); 
        res.write(data);
        res.end();
      });

    }

  }
  if (req.method === 'POST') {

    // if post.url is in archive
    // send back the archived html
    // else 
    // send back the loading page static site
    // archive.add url to addUrlToList

    var body = '';
    req.on('data', (data) => {
      body += data.toString();
    }).on('end', () => {
      console.log(body);
      var post = qs.parse(body);

      archive.isUrlArchived(post['url'], (isArchived) => {
        if (isArchived) {
          helper.serveAssets(res, archive.paths.archivedSites + '/' + post['url'], (data) => {
            res.writeHead(200, helper.headers);
            res.write(data);
            res.end();
          });
        } else {
          archive.addUrlToList(post['url'], (error) => {
            console.log(error);
          });
          helper.serveAssets(res, archive.paths.siteAssets + '/loading.html', (data) => {
            res.writeHead(302, 'Found'); 
            res.write(data);
            res.end();
          });
        }
      });
    });
  }
};
