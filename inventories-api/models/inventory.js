// imports
const mongoose = require('mongoose');

// JSON Schema for inventory data
const inventorySchema = mongoose.Schema({
   user_id: {
      type: String,
      required: true,
      unique: true
   }, 
   inventory: {
      type: Object,
      required: true,
   }
});

// Makes model available outside of file
var Inventory = module.exports = mongoose.model('Inventory', inventorySchema);

/** ADD INVENTORY
 * Requires: database object
 * Returns: inventory database
 * Expects: unique id (within inventory object) which matches a user from the users database
 */
module.exports.addInventory = (inventory, callback) => {
	Inventory.create(inventory, callback);
;}

/** GET INVENTORY DATA 
 * Requires: id
 * Returns: inventory
 */
module.exports.getInventory = (id, callback, err) => {
   Inventory.findOne({"user_id": id}, callback);
//    Inventory.findOne({"user_id": id}, callback).select('-_id').catch(err);
};

/** UPDATE Inventory DATA
 * Requires: id and inventory object (part or full)
 * Returns: inventory in state before edit
 */
module.exports.updateInventory = (id, inventory, options, callback) => {
   Inventory.findOneAndUpdate({"user_id": id}, inventory, options, callback);
};

/** REMOVE INVENTORY
 * Requires: id
 * Returns: results object
 */
module.exports.removeInventory = (id, callback) => {
	Inventory.deleteOne({"user_id": id}, callback);
};

module.exports.validInventory = () => {
   return {
      "user_id": "some-id",
      "inventory": {
         "item_id_1": {
            "qty": 1,
            "hq_qty": 1
         }
      }
   };
};