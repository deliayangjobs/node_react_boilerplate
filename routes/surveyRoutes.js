const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const template = require('../services/emailTemplates/surveyTemplate');

// create survey
module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients} = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            // ({ email }) () specifies { email } is an object, not function body
            // pass an array of object, mongoose will create Recipients collection for us
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            // mongoose generate id in mongo automatically for every model
            _user: req.user.id,
            dateSent: Date.now()

        });

        // send email
        const mailer = new Mailer(survey, template(survey));
        mailer.send();
    });
};
