const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// single argument, fetch
// two arguments, push
const User = mongoose.model('users');

// console.developers.google.com
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // profile id from google user id
        new User({ googleId: profile.id }).save();
    })
);
