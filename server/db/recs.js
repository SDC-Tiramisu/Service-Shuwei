const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const recsSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  genre: String,
  title: String,
  recs: []
});

const Recs = mongoose.model('Recommendations', recsSchema);

module.exports = Recs;