var itemList = require('./item-list').itemList;
var recipeList = require('./recipe-list').recipeList;
var itemSearchList = require('./item-search-category').itemSearchList;
var fs = require('fs');

var list = [];

setTimeout(function () {

    itemList.forEach((item) => {
        list.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            search_category: itemSearchList[item.search_category].name,
            search_category_icon: itemSearchList[item.search_category].image_url,
            ingredients: typeof recipeList[item._id] === 'undefined' ? null : recipeList[item._id].ingredients,
            icon_id: item.image_url
        });
    });

    setTimeout(function () {
        fs.writeFile('initial-data.json', JSON.stringify(list), function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    }, 10000);

}, 5000);
