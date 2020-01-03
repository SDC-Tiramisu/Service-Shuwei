const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'zaggat'
});

client.connect(function (err) {
  if(err){
    console.log("cassandra errors: ",err);
  }else{
    console.log("cassandra connected")
  }
});

module.exports = client;