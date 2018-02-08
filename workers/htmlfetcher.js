// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('../web/http-helpers');
var fs = require('fs');
const fetch = require('node-fetch');

// readlistofurls, use downloadUrls as the callback
// if urls are not archived
// fetch and store fs.write to archives/sites , 



archive.readListOfUrls( (urls) => {
  archive.downloadUrls(urls, (url) => {
    fetch('http://www.google.com').then((response) => {
      fs.writeFile(archive.paths.archivedSites + '/' + "http://www.google.com".split('/')[2], JSON.parse(JSON.stringify(response.body)), (error) => {
        if (error) {
          console.log(`error: ${error}`);              
        }
      });
    }).catch(err => console.log(err));
  });
});