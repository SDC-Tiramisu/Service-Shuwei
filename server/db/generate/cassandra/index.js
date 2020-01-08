const cassandra = require('cassandra-driver');
const contactpoint = '172.31.13.193:9042';
const client = new cassandra.Client({
  contactPoints: contactpoint,
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