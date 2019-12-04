const mongoose = require('mongoose');
const Recs = require('./recs.js');

const db = mongoose.connection;
mongoose.connect('mongodb://localhost/zagat');

const get = (id) => {
  return new Promise((resolve, reject) => {
    Recs.find({ 'id': id })
      .exec((err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
  });
};

module.exports = { db, get };