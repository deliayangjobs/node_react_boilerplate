const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const template = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // a default package in node system

// create survey
module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname); // return null or found match
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact() // remove all undefined elements
            .uniqBy('email', 'surveyId') // compare both email and surveyId
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
        try {
            //await make the following code wait this request complete
            await mailer.send();
            await survey.save();

            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
