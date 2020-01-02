const mongoose = require('mongoose');
const Recs = require('./recs.js');

mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/zagat', { useNewUrlParser: true, useUnifiedTopology: true });

const get = (id) => {
   const result = Recs.find({ id })
   return result.exec();
};

const create = (data) => {
 let rec = new Recs(data);
 return rec.save();
}

const update = (id, data) => {
 const result = Recs.findOneAndUpdate(
   {id},
   data,
   {new:true}
 )
 return result.exec();
}

const deletedata = (id) => {
 const result = Recs.findOneAndRemove({ id });
 return result.exec();
}

module.exports = { db, get, create, update, deletedata};
