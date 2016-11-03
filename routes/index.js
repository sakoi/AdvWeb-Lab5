var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Advance Web - Lab5',
    message: 'This is Lab 5 by Kayla Wiest. This lab uses passport to allow users to register and log into the application and view the list of all users.',
    userLog: req.user});
});

/* GET register page */
router.get('/register', function(req, res, next){
  res.render('register', {
    title: 'Register',
    userLog: req.user
  });

});

/* POST register page */
router.post('/register', function (req, res, next) {
  Account.register(new Account( { username: req.body.username }),
      req.body.password, function(err, account){
        if(err){
          console.log(err);

          res.render('error', {
            message: 'Username already registered',
            error: err
          });
        }else{
          res.redirect('login');
        }
      });
});

/* GET login page */
router.get('/login', function(req, res, next){

  var messages= req.session.messages || []; //store any messages, if not make empty array

  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    userLog: req.user,
    messages:messages
  });


});

/* POST login get */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}));


/* GET logout page*/
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

module.exports = router;


