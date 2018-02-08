// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('../web/http-helpers');
var fs = require('fs');
var fetch = require('node-fetch');
var https = require('https');

// readlistofurls, use downloadUrls as the callback
// if urls are not archived
// fetch and store fs.write to archives/sites , 

archive.readListOfUrls( (urls) => {
  archive.downloadUrls(urls, (url) => {
    var concatenatedUrl = 'https://' + url;
    console.log(concatenatedUrl);
    https.get(concatenatedUrl, (res) => {
      let error;
      if (res.statusCode !== 200) {
        error = new Error(`Request failed with status code ${res.statusCode}`);
      }

      if (error) {
        console.log(error.message);
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = rawData.toString();
          fs.writeFile(archive.paths.archivedSites + '/' + url, parsedData, (err) => {
            if (err) {
              console.log(`error: ${error}`);
            }
            console.log('writing to the file');
          });
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
  });
});





// archive.readListOfUrls( (urls) => {
//   archive.downloadUrls(urls, (url) => {
//     fetch('http://www.google.com').then((response) => {
//       fs.writeFile(archive.paths.archivedSites + '/' + "http://www.google.com".split('/')[2], JSON.parse(JSON.stringify(response.body)), (error) => {
//         if (error) {
//           console.log(`error: ${error}`);              
//         }
//       });
//     }).catch(err => console.log(err));
//   });
// });