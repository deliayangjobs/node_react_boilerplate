const express = require('express');
require('./services/passport'); // just to execute passport.js code

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
