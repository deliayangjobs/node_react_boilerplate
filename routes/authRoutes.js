const passport = require('passport');
module.exports = (app) => {

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

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
