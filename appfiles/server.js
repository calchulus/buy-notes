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

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/uploadfiles.html');
  console.log('listening');
});

app.get('/login', function(req,res){
  res.sendFile(__dirname + '/public/login.html');
  console.log("entered the login page");
  console.log("This is the login status" + loginstatus);
  if(loginstatus) {
    console.log("Login Success!!!");
  res.redirect('/marketplace');
} else {
  console.log("Login Failed!!!");
}
});

app.get('/marketplace', function(req,res){
  res.sendFile(__dirname + '/public/marketplace.html');
  console.log("entered the marketplace");
});

app.get('/account', function(req,res){
  res.sendFile(__dirname + '/public/account.html');
  console.log("entered account");
});

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let sampleFile = req.files.sampleFile;
  let fileName = req.files.sampleFile.name;
  sampleFile.mv('uploadedfiles/'+fileName, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('' + fileName + ' uploaded successfully, click the back button to go back! For this hack, files will be stored in /uploadedfiles');
  });


});
let loginstatus = false;
io.on('connection', function (socket) {
  socket.on("registered", (result)=> {
    console.log("User registered");
    console.log(result.Username);
    datastorage.addUser(result);
  });
  socket.on("logined", (result) => {
    datastorage.login(result, (data)=>{
      loginstatus = data;
    });
    console.log("wowowoow" + loginstatus);
  });

  socket.on("updateList", (result)=> {
    console.log("updateList called"+listOfFiles);
    socket.emit("listUpdated",listOfFiles);
  });
});