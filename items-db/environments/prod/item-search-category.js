var fs = require('fs');
var fastCsv = require('fast-csv');
var itemSearchList = [];

var fileStream = fs.createReadStream("ItemSearchCategory.csv");
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
            if (data[1] !== '') {
                itemSearchList[data[0]] = {
                    _id: data[0],
                    name: data[1],
                    image_url: data[2]
                };
            }
        }
        itemSearchList[0] = {
            _id: '0',
            name: 'uncategorised',
            image_url: null
        };
    })
    .on("end", function () {
        fs.writeFile('categories.json', JSON.stringify(itemSearchList), function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
        console.log('done item category list');
    });

module.exports = {
    itemSearchList: itemSearchList
};