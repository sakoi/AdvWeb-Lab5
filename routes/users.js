var express = require('express');
var router = express.Router();

//link to account model
var account = require('../models/account');

//authentication check
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    next();
  }else{
    res.redirect('/login');
  }
}

/* GET users list */
router.get('/',isLoggedIn, function(req, res, next) {
  account.find(function(err, usersList){
    if(err){
      console.log(err);
      res.render('error');
    }else{
      res.render('users', {
        title: 'List of Users',
        userLog: req.user,
        users : usersList
      })
    }
  });

});

module.exports = router;
