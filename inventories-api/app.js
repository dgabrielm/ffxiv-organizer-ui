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
const Inventory = require('./models/inventory');

/** ADD INVENTORY
 * Requires: database object
 * Returns: inventory database
 * Expects: unique id (within inventory object) which matches a user from the users database
 */
app.post('/inventories', (req, res) => {
  var inventory = req.body;
  Inventory.addInventory(inventory, (err, inventory) => {
    if(err){
      console.log(err);
    }
    res.json(inventory);
  });
});

/** GET INVENTORY DATA 
 * Requires: id
 * Returns: inventory
 */
app.get('/inventories/:id', (req, res) => {
	Inventory.getInventory(req.params.id, (err, inventory) => {
		if(err){
			console.log(err);
		}
		res.json(inventory);
	});
});

/** UPDATE Inventory DATA
 * Requires: id and inventory object (part or full)
 * Returns: inventory in state before edit
 */
app.post('/inventories/:id', (req, res) => {
  let inventory = req.body;
  Inventory.updateInventory(req.params.id, inventory, {}, (err, inventory) => {
    if(err){
      console.log(err);
    }
    res.json(inventory);
  });
});

/** REMOVE INVENTORY
 * Requires: id
 * Returns: results object
 */
app.delete('/inventories/:id', (req, res) => {
  Inventory.removeInventory(req.params.id, (err, inventory) => {
    if(err){
      console.log(err);
    }
    res.json(inventory);
  });
});

// Express server port
app.listen(config.app.port, () => {
   console.log('app has started successfully on port ' + config.app.port);
});
