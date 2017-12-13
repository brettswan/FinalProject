var express = require('express');
var multer  = require('multer');
var router = express.Router();
var upload = multer({dest:'uploads/'});
upload.single('photo');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', upload.single('photo'),function (req,res){
});


module.exports = router;
