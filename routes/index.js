var express = require('express');
var router = express.Router();
var Bird = require('../models/bird')

/* GET home page. */
router.get('/', function(req, res, next) {

  Bird.find().select( { name: 1, description : 1 } ).sort( { name: 1 } )
  .then( ( docs ) => {
    console.log(docs);
    res.render('index', { title: "All Birds", birds: docs });
  } ).catch ((err) => {
    next(err)
    });
});

router.post('/addBird', function(req, res, next) {
  var bird = Bird(req.body);
  bird.save()
  .then ( (doc) => {
    console.log(doc);
    res.redirect('/')
  })
  .catch( (err) => {
    if (err.name === 'ValidationError') {
      req.flash('error', err.message);
      res.redirect('/');
    }
    else if (err.code === 11000) {
      req.flash('error', req.body.name + ' is already in the database.')
      res.redirect('/');
    }
    else {
    next(err);
  }
  });
});

router.get('/bird/:_id', function(req, res, next) {

  Bird.findOne( { _id:  req.params._id})
  .then( (doc) => {
    if (doc) {
      res.render('bird', { bird: doc });

    } else {
      res.status(404);
      next(Error("Bird not found"));
    }
  })
  .catch( (err) => {
    next(err);
  });
});

module.exports = router;
