const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// large system could have multiple express apps
const app = express();

// console.developers.google.com
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
    })
);

// when user visit /auth/google, we handover user to passport
// to authenticate user, use strategy 'google', GoogleStrategy has
// an internal identifier as 'google', thats why can use here
// options.scope ask google get user's profile and email info
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// when user get direct back to callback from signin with google
// here has code info available, passport will exchange the code
// for user profile
app.get('/auth/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
