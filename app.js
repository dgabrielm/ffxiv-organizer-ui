const express = require('express');
const app = express();
const path = require ('path');

// sets root directory to 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
   res.sendFile('index.html');
});

app.listen(8888, () => {
   console.log('app has started successfully');
});

