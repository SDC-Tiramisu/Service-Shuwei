const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors');
const https = require('https');
const db = require('./db/index.js');

const app = express();

app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/api/restaurants/:restaurantId', (req, res) => {
 var id = req.params.restaurantId;
 db.get(id)
   .then(data => res.send(data))
   .catch(err => console.log("get errors: ",err));
});

app.post('/api/restaurants', (req, res) => {
 var data=req.body;
 db.create(data)
   .then(res.status(200).send("db post is good"))
   .catch(err => console.log("post errors: ",err));
})

app.put('/api/restaurants/:restaurantId', (req, res) => {
 var data = req.body;
 var id = req.params.restaurantId;
 db.update(id,data)
 .then(res.status(200).send("db put is good"))
 .catch(err => console.log("put errors: ",err));
})

app.delete('/api/restaurants/:restaurantId', (req, res) => {
 var id = req.params.restaurantId;
 db.deletedata(id)
 .then(res.status(200).send("db delte is good"))
 .catch(err => console.log("delete errors: ",err));
})

const port = 3005;
app.listen(port, () => console.log(`listening on port ${port}`));
