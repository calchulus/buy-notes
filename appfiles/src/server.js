let express = require('express');
let app = express();
let yolo = require('./storeuserdata');
let fileUpload = require('express-fileupload');

app.use(fileUpload());
app.get('/', function(req, res){
  res.sendFile(__dirname + '/uploadfile.html');
});

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let sampleFile = req.files.sampleFile;
  let fileName = req.files.sampleFile.name;
  sampleFile.mv('uploadedfiles'/fileName + '.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(3000, ()=>{
	console.log("Started listening on port 3000");
});