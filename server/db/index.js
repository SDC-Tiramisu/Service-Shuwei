const mongoose = require('mongoose');
const Recs = require('./recs.js');

mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/zagat', { useNewUrlParser: true, useUnifiedTopology: true });

const get = (id) => {
  return new Promise((resolve, reject) => {
    Recs
      .find({ id })
      .exec((err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
  });
};

module.exports = { db, get };