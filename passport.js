const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const mongoose = require('mongoose');
//get the users model instance
const User = mongoose.model('user');


passport.serializeUser((user, done) => {
  // console.log('serialize THE USER')
  //stuffs into the cookie/session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log('deserialize THE USER', id)
  //put on the request object
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

//make strategy available to passport
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, 
  async (accessToken, refreshToken, profile, done) => {
    //info back from google to create a new user on our db
    const existingUser = await User.findOne({googleId: profile.id})

    console.log('GOOGLE', profile);

    if(!existingUser) {
      const newUser = await new User({googleId: profile.id, displayName: profile.displayName}).save();
      return done(null, newUser);
    }

    done(null, existingUser);
  }
));