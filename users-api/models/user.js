// imports
const mongoose = require('mongoose');

// JSON Schema for user data
const userSchema = mongoose.Schema({
   first_name: {
      type: String,
      required: true
   },
   last_name: {
      type: String,
      required: true
   },
   email_address: {
      type: String,
      format: "email",
      required: true,
      unique: true
   },
   character_name: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      format: "password",
      required: true,  
   }
});

// Makes model available outside of file
var User = module.exports = mongoose.model('User', userSchema);

/** ADD USER
 * Requires: user object
 * Returns: user data
 * Expects: unique username and email address
 */
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
;}

/** GET USER DATA 
 * Requires: username and password
 * Returns: user
 */
module.exports.getUser = (username, password, callback, err) => {
   User.findOne({"username": username, "password": password}, callback).select('-password').catch(err);
};

/** GET USERNAMES
 * Returns: usernames
 */
module.exports.getUsernames = (callback, err) => {
   User.find({}, 'username', callback);
};

/** UPDATE USER DATA
 * Requires: username, password, user object (part or full)
 * Returns: user in state before edit
 */
module.exports.updateUser = (username, password, user, options, callback) => {
   User.findOneAndUpdate({"username": username, "password": password}, user, options, callback);
};

/** REMOVE USER
 * Requires: username and password
 * Returns: results object
 */
module.exports.removeUser = (username, password, callback) => {
	User.deleteOne({"username": username, "password": password}, callback);
};

// Test Data
module.exports.validUser = () => {
   return {
      "first_name": 'first name',
      "last_name": 'last name',
      "email_address": 'email',
      "character_name": 'character',
      "username": 'username', 
      "password": 'password'
   };
};
