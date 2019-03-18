var fs = require('fs');
var fastCsv = require('fast-csv');
var recipeList = [];
var fileStream = fs.createReadStream("Recipe.csv");
var parser = fastCsv();
var i = -3;

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
            if (i > 0 && data[4] > 0) {
                if (typeof recipeList[data[4]] === 'undefined') {
                    // get easy data
                    recipeList[data[4]] = {
                        _id: data[0],
                        makes: data[4],
                        makes_qty: data[5],
                        craft_type: data[2],
                        ingredients: {
                            carpenter: [],
                            blacksmith: [],
                            armorer: [],
                            goldsmith: [],
                            leatherworker: [],
                            weaver: [],
                            alchemist: [],
                            culinarian: []
                        }
                    };
                }
                // Assign ingredients
                var x = 6;
                switch (data[2]) {
                    case '0':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.carpenter.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    case '1':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.blacksmith.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    case '2':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.armorer.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    case '3':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.goldsmith.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    case '4':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.leatherworker.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    case '5':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.weaver.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    case '6':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.alchemist.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    case '7':
                        while (x <= 25) {
                            if (data[x] > 0) {
                                recipeList[data[4]].ingredients.culinarian.push(data[x]);
                            }
                            x++;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    })
    .on("end", function () {
        console.log('done done recipe list');
    });

module.exports = {
    recipeList: recipeList
};
