var yolo = require('./storeuserdata');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://admin:password@ds227525.mlab.com:27525/notesbuddy';
// Use connect method to connect to the server
let data = {Username: 'bro', password: 'hogo'};
console.log('Connected to swag');

function addUser(data) {

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  yolo.insertDocuments(data, db, function() {
    db.close();
  });
});

}
function login(data, callback) {
let status = false;
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  yolo.findUsers(data, db, function(data) {
    console.log("yolo" + data);
    db.close();
    callback(data);
  });
});
}

module.exports = {
  addUser: addUser,
  login: login
}