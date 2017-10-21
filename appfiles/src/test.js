var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://user:password@ds229295.mlab.com:29295/buy-notes';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    db.close();
  });
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('users');
  // Insert some documents
  collection.insertMany([
    {yolo : 1, hey : 6}, {swag : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}