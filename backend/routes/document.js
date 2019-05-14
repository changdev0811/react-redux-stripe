const express = require('express');
const router = express.Router();
const logger = require('morgan')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const Document = require('../models/Document');
var fileName;
var directory;

router.use(logger('dev'))
router.use(cors())
router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
router.use(fileUpload())
router.use('/public', express.static(__dirname + '/public'))

router.get('/', function(req,res){
  Document.find(function(err, documents){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(documents);
  })
});

router.get('/align/remarks/:name', function(req,res){
    Document.findOne({_id:req.params.name},{'remarks': true, '_id' : false}, function(err, document){
      if(err){
        res.status(500).json({ code:'500',message:'fail',error: err });
      }else if(!document){
          res.status(404).json({code:'404',message:'fail',error:"Not Found document!-requested resource is not available now" });
      }
      else {
          res.status(200).json(document);
      }
  })
});

router.get('/:dentist_id', function(req, res){
  Document.find({dentist_id: req.params.dentist_id}, function(err, dentist){
      if(err) return res.status(500).json({error: err});
      if(!dentist) return res.status(404).json({error: 'Dentist not found'});
      res.json(dentist);
  })
});

router.get('/operator/:name', function(req, res){
  Document.find({operator_id: req.params.name }, function(err, dentist){
      if(err) return res.status(500).json({error: err});
      if(!dentist) return res.status(404).json({error: 'Dentist not found'}); 
      res.json(dentist);
  })
});

router.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file
  fileName = req.files.file.name

  uploadFile.mv(
    `public/files/${fileName}`,
    function (err) {

      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })

      directory = 'http://localhost:5000/files/' + fileName;
    },
  )

})

router.post('/document', function(req, res){

  var document = new Document(req.body);
  document.directory = directory;
  document.Filename = fileName;
  document.save(function(err){
        if(err){
            res.status(500).json({ code:'500',message:'fail',error: err });
        } else {
            res.status(201).json({ code:'201',message:'success - new pay Document is created',data:req.body });
        }
    });
});


router.post('/insertremark/:name', function(req, res){

 // document.directory = directory;
 // document.Filename = fileName;

 Document.updateOne({ _id: req.params.name }, {
    $push: {remarks : req.body}
      }, function(err, member){

    if(err){
        res.status(500).json({ code:'500',message:'fail',error: err });
    }else if(!member){
        res.status(400).json({code:'404',message:'fail',error:"Not Found Member" });
    }
    else {
        res.status(200).json({ code:'200',message:'success',data:req.body });
    }
  })
  });

  router.put('/update/:name', function(req, res){
   
    Document.updateOne({ _id: req.params.name }, {
       $set: req.body }, function(err, member){
   
       if(err){
           res.status(500).json({ code:'500',message:'fail',error: err });
       }else if(!member){
           res.status(400).json({code:'404',message:'fail',error:"Not Found Document" });
       }
       else {
           res.status(200).json({ code:'200',message:'success',data:req.body });
       }
     })
     });

module.exports = router;
