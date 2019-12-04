const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const db = require('./db/index.js');

const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/api/restaurants/:restaurantId', (req, res) => {
  const id = parseInt(req.params.restaurantId);
  db.get(id)
    .then(data => res.send(data));
});