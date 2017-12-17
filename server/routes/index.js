var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.mongo = require('mongodb');
var gridfsstorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var conn = mongoose.connect('mongodb://brettswan:M)tom%40n5962017@finalproject-shard-00-00-agshj.mongodb.net:27017,finalproject-shard-00-01-agshj.mongodb.net:27017,finalproject-shard-00-02-agshj.mongodb.net:27017/test?ssl=true&replicaSet=FinalProject-shard-0&authSource=admin');
var gfs = new Grid(conn, mongoose.mongo);
var multer = require('multer');

var storage = gridfsstorage({

  url: 'mongodb://brettswan:M)tom%40n5962017@finalproject-shard-00-00-agshj.mongodb.net:27017,finalproject-shard-00-01-agshj.mongodb.net:27017,finalproject-shard-00-02-agshj.mongodb.net:27017/test?ssl=true&replicaSet=FinalProject-shard-0&authSource=admin',

  filename: function(req,file,callback) {
    callback(null, file.fileName);
  },

  root: 'Images'

});

var supload = multer({ storage: storage });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', supload.single('photo'),function (req,res){
  console.log("Uploaded");
  res.status(201).json({
    message: "Success",
    filename: req.file.filename
  });
});

router.get('/img/:id', function(req,res) {

  gfs.findOne({ filename: req.params.id, root: 'Images'}, function (err, file){
    console.log("Hello");
    if(!err){
      if(file){
        var readstream = gfs.createReadStream({
          filename: file.filename,
          root: "Images"
        });
        res.set('Content-Type', file.contentType);
        return readstream.pipe(res);
      }
      return res.status(400).json({
        title: 'File not Found'
      });
    }
  });
});

module.exports = router;
