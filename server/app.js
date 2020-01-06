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

// app.get('/api/restaurants/:restaurantId', (req, res) => {
//  var id = req.params.restaurantId;
//  var q = `SELECT genre, title, recommendrestaurant FROM recommendres where id = ${id}`
//   client.execute(q, { prepare: true })
//     .then((data) => {
//     const idArr = data.rows[0].recommendrestaurant;
//     console.log("this is idArr, ",idArr)
//     const genre = data.rows[0].genre;
//     const title = data.rows[0].title;
//     let expected = [];
//     for(var i = 0; i < idArr.length; i++){
//       client.execute(`SELECT title,description, price,images FROM recommendres WHERE id = (${idArr[i]});`)
//       .then((data) => {
//         console.log("this is data: ",data)
//         for(var i = 0; i < data.rows[0].images.length;i++){
//           var numImage = data.rows[0].images[i];

//           data.rows[0].images[i] = `http://sdc-5-images.s3-us-west-1.amazonaws.com/scapeImages/${numImage}.jpg`
//           expected.push(data.rows[0])
//         }
//       })
//       .catch(err => console.log("inside get errors: ",err));
//     }
//     // res.send({expected})

//   })

//    .catch(err => console.log("get errors: ",err));
// });

app.get('/api/restaurants/:restaurantId', (req, res) => {
  var id = req.params.restaurantId;
  var q = `SELECT id, genre, title, recommendrestaurant FROM recommendres where id = ${id}`
  client.execute(q)
    .then(data => {
      return data.rows[0];
    })
    .then(async (data) => {
      let expected = [];
      let recs = data['recommendrestaurant'];
      for (let i = 0; i < recs.length; i++) {
        results = await client.execute(`SELECT title,description, price,images FROM recommendres WHERE id =${recs[i]};`);
        console.log(results.rows[0].images);
        for (let x=0; x<results.rows[0].images.length; x++){
          let numImage= results.rows[0].images[x];
          results.rows[0].images[x]= `http://sdc-5-images.s3-us-west-1.amazonaws.com/scapeImages/${numImage}.jpg`;
        }
        expected.push(results.rows[0]);
      }
      data.recs = expected;
      return data;
    })
    .then(data => res.send(data))
    .catch(err => console.log("get errors: ",err));
 });

app.post('/api/restaurants', (req, res) => {
 var data=req.body;
 const q = `INSERT INTO recommendres (id, genre, title, price,description, recommendrestaurant, images) VALUES(${req.body.id},${req.body.genre},${req.body.title},${req.body.price},${req.body.description},${req.body.recommendrestaurant},${req.body.images})`;
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

const port = 3005;
app.listen(port, () => console.log(`listening on port ${port}`));
