var fs = require('fs');
var fastCsv = require('fast-csv');
var sanitizeHtml = require('sanitize-html');
var i = -3;

var itemList = [];
var fileStream = fs.createReadStream("Item.csv");
var parser = fastCsv();

fileStream
    .on("readable", function () {
        var data;
        while ((data = fileStream.read()) !== null) {
            parser.write(data);
        }
    })
    .on("end", function () {
        parser.end();
    });

parser
    .on("readable", function () {
        var data;
        while ((data = parser.read()) !== null) {
            i++;
            if (i > 0 && data[10] !== '') {
                itemList[data[0]] = {
                    _id: data[0],
                    name: data[10],
                    description: sanitizeHtml(data[9]).replace(/F201F8F201F9/g, ''),
                    // description: data[9] === '' ? 'no description available' : sanitizeHtml(data[9]).replace(/F201F8F201F9/g, ''), no longer wish to inject text here
                    search_category: data[17],
                    image_url: data[11]
                };
            };
        }
    })
    .on("end", function () {
        console.log('done item list');
    });

module.exports = {
    itemList: itemList
};
