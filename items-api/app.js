// imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');

// database connection
const { db: { location, port, collection } } = config;
const connectionString = `mongodb://${location}:${port}/${collection}`;

mongoose.connect(connectionString,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// data models required for API calls
const Item = require('./models/item');
const Category = require('./models/category');

// Allow cross origin access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/** GET ITEM BY ID 
 * Requires: desired item id
 * Returns: item
 */
app.get('/items/id/:id', (req, res) => {
	Item.getItemById(req.params.id, (err, item) => {
		if(err){
			console.log(err);
		}
		res.json(item);
	});
});

/** GET ITEMS BY NAME
 * Requires: desired item name
 * Returns: item
 */
app.get('/items/name/:name', (req, res) => {
	Item.getItemsByName(req.params.name, (err, item) => {
		if(err){
			console.log(err);
		}
		res.json(item);
	});
});

/** GET ITEMS BY CATEGORY
 * Requires: desired item name
 * Returns: all items with matching category
 */
app.get('/items/category/:category', (req, res) => {
	Item.getItemsByCategory(req.params.category, (err, item) => {
		if(err){
			console.log(err);
		}
		res.json(item);
	});
});

/** GET Categories
 * Returns: list of categories
 */
app.get('/categories', (req, res) => {
	Category.getCategories((err, categories) => {
		if(err){
			console.log(err);
		}
		res.json(categories);
	});
});

app.listen(config.app.port, () => {
   console.log('app has started successfully on port ' + config.app.port);
});
