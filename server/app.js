require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const cors = require('cors');
const https = require('https');
// const db = require('./db/index.js');
const client = require('./db/generate/cassandra/index.js');

const app = express();

app.use(bodyParser.json());

app.use(express.static('client'));


app.get('/api/restaurants/:restaurantId', (req, res) => {
  var id = req.params.restaurantId;
  var q = `SELECT genre, title, recommendrestaurant FROM recommendres where id = ${id}`
  client.execute(q)
    .then((data)=> {
      var idArr = data.rows[0].recommendrestaurant;
      var genre = data.rows[0].genre;
      var title = data.rows[0].title;
      var q2 = `SELECT title,description, price,images FROM recommendres WHERE id IN (${idArr});`
      client.execute(q2)
        .then((data)=>{
          console.log("second data:",data.rows)
          var recArr = data.rows
          res.send({recArr, genre, title})
        })
        .catch(err => console.log("inside query errors: ",err));
    })
    .catch(err => console.log("get errors: ", err));
  })

app.post('/api/restaurants', (req, res) => {
 var data=req.body;
 const q = `INSERT INTO recommendres (id, genre, title, price,description, recommendrestaurant, images) VALUES(?,?,?,?,?,?,?)`;
 console.log("data====",data)
 client.execute(q, data, {prepare: true})

   .then(res.status(200).send("db insert is good"))
   .catch(err => console.log("insert errors: ",err));
})

app.put('/api/restaurants/:restaurantId', (req, res) => {
 var data = req.body;
 var id = req.params.restaurantId;
 const q = `UPDATE recommendres SET genre = ?, title = ?, price = ?, description = ?, recommendrestaurant = ? images = ? WHERE id = ${id}`
 client.execute(q, [data.genre, data.title, data.price, data.description, data.recommendrestaurant, data.images], {prepare:true})
 .then(res.status(200).send("db update is good"))
 .catch(err => console.log("update errors: ",err));
})

app.delete('/api/restaurants/:restaurantId', (req, res) => {
 var id = req.params.restaurantId;
 const q = `DELETE FROM recommendres WHERE id = ${id}`;
 client.execute(q)
 .then(res.status(200).send("db delte is good"))
 .catch(err => console.log("delete errors: ",err));
})

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`listening on port ${port}`));
