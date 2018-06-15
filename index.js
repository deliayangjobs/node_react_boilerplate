const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport'); // just to execute passport.js code

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
// enable cookies in express
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey] // for cookie encrypt
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // routes other than authRoutes and billingRoutes above
    // like /client/build/static/js/main.js
    app.use(express.static('client/build'));

    // routes other than find specific file under client/build
    // like /surveys
    const path = require('path');
    app.get('*', (req, res) => {
        // __dirname gives you the path of the currently running file
        // path.resolve return an absolute path
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
