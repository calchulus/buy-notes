let express = require('express');
let datastorage = require('./swag');
let fileUpload = require('express-fileupload');
const app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var assert = require('assert');
// var app = require('express')();
var MongoClient = require('mongodb').MongoClient


var url = 'mongodb://user:password@ds229295.mlab.com:29295/buy-notes';

server.listen(5000, ()=> {
  console.log('Listening to port 5000');
});

app.use(fileUpload());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/uploadfile.html');
  console.log('listening');
});


let listOfFiles = [];
app.post('/upload', function(req, res) {
  res.sendFile(__dirname + '/uploadfile.html');
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let sampleFile = req.files.sampleFile;
  let fileName = req.files.sampleFile.name;
  listOfFiles.push(fileName);
  console.log(listOfFiles);
  console.log(listOfFiles.length);
  console.log(fileName);
  socket.emit("updateList");
  sampleFile.mv('uploadedfiles/'+fileName, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });


});

io.on('connection', function (socket) {
  socket.on("registered", (result)=> {
    console.log("User registered");
    console.log(result.Username);
    datastorage.addUser(result);
  });
  socket.on("logined", (result) => {
    console.log("logged in");
    datastorage.login(result);
  });

  socket.on("updateList", (result)=> {
    console.log("updateList called"+listOfFiles);
    socket.emit("listUpdated",listOfFiles);
  });
});