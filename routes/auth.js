const passport = require('passport');
const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const User = require('../models/user');

// PASSPORT ROUTES
 //look for the google strategy and use that for the req
 router.get('/auth/google', passport.authenticate('google', {
  //access to profile and email info from user account
  scope: ['profile', 'email']
})
);

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // console.log('USER', req.user);
  // res.send({user: req.user});
  // console.log('AUTH WORKS');
  res.redirect('/');
});

router.get('/api/logout', (req, res) => {
  //kills the cookie
  req.logout();
  // res.send(req.user);
  res.redirect('/');
})

router.get('/api/current_user', (req, res) => {
  // res.send(req.session);
  res.send(req.user);
})

module.exports = router;
