var fs = require('fs');
var path = require('path');
var os = require('os');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      console.log(`Error caught: ${err}`);
    }
    callback(data.toString().split('\n'));
  });

};

exports.isUrlInList = function(url, callback) {
 
  this.readListOfUrls((data) => {
    return callback(_.contains(data, url));
  });



};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url + os.EOL, callback);  
};

exports.isUrlArchived = function(url, callback) {
  // if there is a file with name url in the archives/sites __dir
  // apply the callback ...

  fs.readFile(this.paths.archivedSites + '/' + url, (err, data) => {
    if (err) {
      // console.log(err);
      return callback(false);
    } 
    if (data) {
      console.log(data);
      return callback(true);
      // return true;
    }
  });
};

exports.downloadUrls = function(urls, callback) {
  //I: list of urls
  //: Making a get request to that URL
  //:

  _.each(urls, (url) => {
    this.isUrlArchived(url, (isArchived) => { 
      if (!isArchived) { 
        callback(url);   
      }
    });
  });




  // _.each(urls, (url) => {
  //   if (this.isUrlArchived(url, (isArchived) => {
  //     if (!isArchived) {
  //       callback(url);
  //     }
  //   })){
  //     console.log('already archived');
  //   }
  
  //   }))

  // }) 

    


};
