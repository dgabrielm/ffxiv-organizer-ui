// imports
const mongoose = require('mongoose');

// JSON Schema for list data
const listSchema = mongoose.Schema({
   user_id: {
      type: String,
      required: true,
      unique: true
   },
   lists: {
      type: Object,
      required: true
   }
});

// Makes model available outside of file
var List = module.exports = mongoose.model('List', listSchema);

/** ADD List
 * Requires: list object
 * Returns: list
 * Expects: unique user_id (within list object) which matches a user from the users database
 */
module.exports.addList = (list, callback) => {
	List.create(list, callback);
;}

/** GET LIST DATA 
 * Requires: id
 * Returns: list
 */
module.exports.getList = (id, callback, err) => {
    List.findOne({"user_id": id}, callback);
//    List.findOne({"user_id": id}, callback).select('-_id').catch(err);
};

/** UPDATE LIST DATA
 * Requires: id and list object (part or full)
 * Returns: list in state before edit
 */
module.exports.updateList = (id, list, options, callback) => {
    List.findOneAndUpdate({"user_id": id}, list, options, callback);
};

/** REMOVE List
 * Requires: id
 * Returns: results object
 */
module.exports.removeList = (id, callback) => {
	List.deleteOne({"user_id": id}, callback);
};

module.exports.validList = () => {
   return {
    "user_id": "some-id",
    "craft_lists": {
            "craft_list_1": undefined
        },
    "obtain_lists": {
            "obtain_list_1": undefined
    }
  };
};