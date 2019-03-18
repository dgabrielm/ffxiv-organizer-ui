const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
   _id: {
      type: String
   },
   name: {
      type: String
   },
   image_url: {
      type: String
   }
});

// Makes model available outside of file
var Category = module.exports = mongoose.model('Category', categorySchema);

/** GET CATEGORIES
 * Returns: list of categories
 */
module.exports.getCategories = (callback, err) => {
   Category.find({}, callback);
};

