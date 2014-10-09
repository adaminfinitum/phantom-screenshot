/*global phantom, require*/
/*jslint vars: true*/
(function () {
    var fs = require('fs');
    var webpage = require('webpage').create();

    var count = 0;

    var fileNameToPageUrl = [
        ['google.png', 'http://www.google.com'],
        ['yahoo.png', 'http://www.yahoo.com'],
        ['bing.png', 'http://www.bing.com']
    ];

    var getCurrentFileName = function () {
      return fileNameToPageUrl[count][0];
    };

    var getCurrentUrl = function () {
      return fileNameToPageUrl[count][1];
    };

    var wait = function () {
        setTimeout(function () {
            if (fs.isFile(getCurrentFileName())) {
              if (++count > fileNameToPageUrl.length - 1) {
                  console.log('Exiting...');
                  phantom.exit();
              } else {
                  fileName = getCurrentFileName();
                  url = getCurrentUrl();
                  capture(count);
              }
            } else {
                console.log('Waiting 2 more seconds...');
                wait();
            }
        }, 2000);
    };

    var capture = function (count) {
      console.log('Capturing URL ' + url);
      webpage.open(getCurrentUrl(), function () {
          webpage.render(getCurrentFileName());
      });
      wait();

    }(count);

}());