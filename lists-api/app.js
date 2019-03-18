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
const List = require('./models/list');

/** ADD List
 * Requires: list object
 * Returns: list
 * Expects: unique user_id (within list object) which matches a user from the users database
 */
app.post('/lists', (req, res) => {
  var list = req.body;
  List.addList(list, (err, list) => {
    if(err){
      console.log(err);
    }
    res.json(list);
  });
});

/** GET LIST DATA 
 * Requires: id
 * Returns: list
 */
app.get('/lists/:id', (req, res) => {
	List.getList(req.params.id, (err, list) => {
		if(err){
			console.log(err);
		}
		res.json(list);
	});
});

/** UPDATE LIST DATA
 * Requires: id and list object (part or full)
 * Returns: list in state before edit
 */
app.post('/lists/:id', (req, res) => {
  let list = req.body;
  List.updateList(req.params.id, list, {}, (err, list) => {
    if(err){
      console.log(err);
    }
    res.json(list);
  });
});

/** REMOVE List
 * Requires: id
 * Returns: results object
 */
app.delete('/lists/:id', (req, res) => {
   List.removeList(req.params.id, (err, list) => {
    if(err){
      console.log(err);
    }
    res.json(list);
  });
});

// Express server port
app.listen(config.app.port, () => {
   console.log('app has started successfully on port ' + config.app.port);
});
