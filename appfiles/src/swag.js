var yolo = require('./storeuserdata');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://user:password@ds229295.mlab.com:29295/buy-notes';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  yolo.insertDocuments(db, function() {
    db.close();
  });
});