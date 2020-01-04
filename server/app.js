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
 var q = `SELECT genre, title, recommendrestaurant FROM newrecommend where id = ${id}`
 var promise = new Promise ((resolve, reject) => {
  client.execute(q, { prepare: true })
    .then((data) => {
    const idArr = data.rows[0].recommendrestaurant;
    console.log("this is idArr, ",idArr)
    const genre = data.rows[0].genre;
    const title = data.rows[0].title;
    let expected = [];
    let counter = 0;
    idArr.forEach((oneId) => {
      client.execute(`SELECT title,description, price,images FROM newrecommend WHERE id = ${oneId}`)
        .then((data) => {
          expected.push(data.rows[0]);
          counter++;
          if (counter === idArr.length) {
            resolve({genre, title, expected});
          }
        });
    })
  })
 })
   .then(data => res.send(data))
   .catch(err => console.log("get errors: ",err));
});

app.post('/api/restaurants', (req, res) => {
 var data=req.body;
 const q = `INSERT INTO newrecommend (id, genre, title, price,description, recommendrestaurant, images) VALUES(?,?,?,?,?,?,?)`;
 console.log("data====",data)
 client.execute(q, data, {prepare: true})

   .then(res.status(200).send("db insert is good"))
   .catch(err => console.log("insert errors: ",err));
})

app.put('/api/restaurants/:restaurantId', (req, res) => {
 var data = req.body;
 var id = req.params.restaurantId;
 const q = `UPDATE newrecommend SET genre = ?, title = ?, price = ?, description = ?, recommendrestaurant = ? images = ? WHERE id = ${id}`
 client.execute(q, [data.genre, data.title, data.price, data.description, data.recommendrestaurant, data.images], {prepare:true})
 .then(res.status(200).send("db update is good"))
 .catch(err => console.log("update errors: ",err));
})

app.delete('/api/restaurants/:restaurantId', (req, res) => {
 var id = req.params.restaurantId;
 const q = `DELETE FROM newrecommend WHERE id = ${id}`;
 client.execute(q)
 .then(res.status(200).send("db delte is good"))
 .catch(err => console.log("delete errors: ",err));
})

const port = 3005;
app.listen(port, () => console.log(`listening on port ${port}`));
