// imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

// middleware to enable the reading of json body arguments
app.use(bodyParser.json());

// Allow cross origin access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// database connection
const { db: { location, port, collection } } = config;
const connectionString = `mongodb://${location}:${port}/${collection}`;

mongoose.connect(connectionString,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// data models required for API calls
const User = require('./models/user');

/** ADD USER
 * Requires: user object
 * Returns: user data
 * Expects: unique username and email address
 */
app.post('/users', (req, res) => {
  var user = req.body;
  User.addUser(user, (err, user) => {
    if(err){
      console.log(err);
    }
    res.json(user);
  });
});

/** GET USER DATA 
 * Requires: username and password
 * Returns: user
 */
app.get('/users/:username/:password', (req, res) => {
	User.getUser(req.params.username, req.params.password, (err, user) => {
		if(err){
			console.log(err);
		}
		res.json(user);
	});
});

/** GET USERNAMES
 * Returns: username
 */
app.get('/users/usernames', (req, res) => {
	User.getUsernames((err, user) => {
		if(err){
			console.log(err);
		}
		res.json(user);
	});
});

/** UPDATE USER DATA
 * Requires: username, password, user object (part or full)
 * Returns: user in state before edit
 */
app.post('/users/:username/:password', (req, res) => {
  let user = req.body;
  User.updateUser(req.params.username, req.params.password, user, {}, (err, user) => {
    if(err){
      console.log(err);
    }
    res.json(user);
  });
});

/** REMOVE USER
 * Requires: username and password
 * Returns: results object
 */
app.delete('/users/:username/:password', (req, res) => {
  User.removeUser(req.params.username, req.params.password, (err, user) => {
    if(err){
      console.log(err);
    }
    res.json(user);
  });
});

// Express server port
app.listen(config.app.port, () => {
   console.log('app has started successfully on port ' + config.app.port);
});
