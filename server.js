const express = require('express');
const app = express();
const path = require ('path');
const config = require('./config');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

app.get('/*', (req, res) => {
   res.sendFile('index.html', { root: 'public/'});
});

app.listen(config.app.port, () => {
   console.log('app has started successfully');
});