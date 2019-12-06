const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const db = require('./db/index.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/api/restaurants/:restaurantId', (req, res) => {
  var id = req.params.restaurantId;
  db.get(id)
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

const port = 3005;
app.listen(port, () => console.log(`listening on port ${port}`));