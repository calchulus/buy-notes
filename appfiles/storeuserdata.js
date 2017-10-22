var MongoClient = require('mongodb').MongoClient, 
assert = require('assert');

// Connection URL
var url = 'mongodb://admin:password@ds227525.mlab.com:27525/notesbuddy';
// Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   insertDocuments(db, function() {
//     db.close();
//   });
// });

var insertDocuments = function(data, db, callback) {
  // Get the documents collection
  var collection = db.collection('users');
  // Insert some documents
  collection.insertMany([
    data
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted username and password and password into the collection");
    callback(result);
  });
}

var findUsers = function(data, db, callback) {
    var collection = db.collection('users');
    collection.find(data).toArray(function(err, result) {
        console.log(result.length);
        if (result.length == 0) {
          console.log("Incorrect Login Info");
        } else {
        console.log(result[0].Username);
        console.log(result[0].Password);
        console.log(result[0].Email);
        console.log("Successfully logged in");
      }
  });
}

module.exports = {
  insertDocuments: insertDocuments,
  findUsers: findUsers
}