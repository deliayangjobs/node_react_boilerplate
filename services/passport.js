const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// single argument, fetch
// two arguments, push
const User = mongoose.model('users');

// user here is the 2nd argument we passed to done
// in GoogleStrategy callback
passport.serializeUser((user, done) => {
    // user.id is not google id
    // it is '_id.$old' mongo generated record id
    // turn user model into id
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    // turn id into user model
    User.findById(id).then( user => { done(null, user) });
});

// console.developers.google.com
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (!existingUser) {
                    // profile id from google user id
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                } else {
                    // call done to tell passport we are finished
                    // 1 no error, here is the user we've found
                    done(null, existingUser);
                }
            })
    })
);
