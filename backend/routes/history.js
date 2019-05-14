const express = require('express');
const router = express.Router();
const logger = require('morgan')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const History = require('../models/History');

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
  History.find(function(err, histories){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(histories);
  })
});

router.get('/:operator_id', function(req, res){
  History.find({operator_id: req.params.operator_id},{'operator_name': true,'created_date': true,'remark': true, '_id' : false,'dentist_name': true,'status': true}, function(err, history){
      if(err) return res.status(500).json({error: err});
      if(!history) return res.status(404).json({error: 'History not found'});
      res.json(history);
  })
});



router.post('/add', function(req, res){

  var history = new History(req.body);
  // document.directory = directory;
  // document.Filename = fileName;
  history.save(function(err){
        if(err){
            res.status(500).json({ code:'500',message:'fail',error: err });
        } else {
            res.status(201).json({ code:'201',message:'success - new pay History is created',data:req.body });
        }
    });
});

module.exports = router;
