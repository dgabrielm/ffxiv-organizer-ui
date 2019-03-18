// imports
const mongoose = require('mongoose');

// JSON Schema for item data
const itemSchema = mongoose.Schema({
   _id: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   search_category: {
      type: String,
      required: true
   },
   search_category_icon: {
      type: String,
      required: true
   },
   ingredients: {
      type: Object,
      required: true
   }
});

// Makes model available outside of file
var Item = module.exports = mongoose.model('Item', itemSchema);

/** GET ITEM BY ID 
 * Requires: desired item id
 * Returns: item
 */
module.exports.getItemById = (id, callback, err) => {
   Item.find({ "_id": id }, callback);
};

/** GET ITEMS BY NAME
 * Requires: desired item name
 * Returns: list of items containing that name
 */
module.exports.getItemsByName = (name, callback, err) => {
   Item.find({ "name": { $regex: new RegExp(name), $options: 'igm' } }, callback);
};

/** GET ITEMS BY CATEGORY
 * Requires: desired item name
 * Returns: all items with matching category
 */
module.exports.getItemsByCategory = (category, callback, err) => {
   Item.find({ "search_category": category }, callback);
};

// Test Data
module.exports.validItem = () => {
   return { 
      "_id": "1", 
      "name": "Gil", 
      "description": 
      "Standard Eorzean currency.", 
      "search_category": "uncategorised", 
      "search_category_icon": null, 
      "ingredients": "no recipe information available" 
   }
};

module.exports.validItemList = () => {
   return [
      {
          "_id": "1",
          "name": "Gil",
          "description": "Standard Eorzean currency.",
          "search_category": "uncategorised",
          "search_category_icon": null,
          "ingredients": "no recipe information available"
      },
      {
          "_id": "2582",
          "name": "Gilded Rosewood Fishing Rod",
          "description": "no description available",
          "search_category": "Fisher's Tools",
          "search_category_icon": "60122",
          "ingredients": {
              "carpenter": [
                  "2581",
                  "1",
                  "5065",
                  "1",
                  "5486",
                  "1",
                  "5066",
                  "1",
                  "4",
                  "6",
                  "3",
                  "6"
              ],
              "blacksmith": [],
              "armorer": [],
              "goldsmith": [],
              "leatherworker": [],
              "weaver": [],
              "alchemist": [],
              "culinarian": []
          }
      }
  ]
};