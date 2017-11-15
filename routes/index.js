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

router.post('/delete', function(req, res, next){

  Bird.deleteOne( { _id : req.body._id } )
    .then( (result) => {

      if (result.deletedCount === 1) {  // one task document deleted
        res.redirect('/');

      } else {
        // The task was not found. Report 404 error.
        res.status(404).send('Error deleting bird: not found');
      }
    })
    .catch((err) => {

      next(err);   // Will handle invalid ObjectIDs or DB errors.
    });

});


router.post('/addBird', function(req, res, next) {
  var bird = Bird(req.body);

  bird.nest = {
    location: req.body.nestLocation,
    materials: req.body.nestMaterials
  }
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
    // else if (err.code === 11000) {
    //   req.flash('error', req.body.name + ' is already in the database.')
    //   res.redirect('/');
    // }
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

router.post('/addSighting', function(req, res, next){

  // Push new date onto datesSeen array and then sort in date order.
  Bird.findOneAndUpdate( {_id : req.body._id}, { $push : { datesSeen : { $each: [req.body.date], $sort: 1} } }, {runValidators : true})
    .then( (doc) => {
      if (doc) {
        res.redirect('/bird/' + req.body._id);   // Redirect to this bird's info page
      }
      else {
        res.status(404);  next(Error("Attempt to add sighting to bird not in database"))
      }
    })
    .catch( (err) => {

      console.log(err);

      if (err.name === 'CastError') {
        req.flash('error', 'Date must be in a valid date format');
        res.redirect('/bird/' + req.body._id);
      }
      else if (err.name === 'ValidationError') {
        req.flash('error', err.message);
        res.redirect('/bird/' + req.body._id);
      }
      else {
        next(err);
      }
    });

});


module.exports = router;
