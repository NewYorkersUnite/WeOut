const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const {getAllPolls, createOnePoll} = require('./handlers/polls');
const {signup, login} = require('./handlers/users');

// remember to cd into firebase dir!!
// IN TERMINAL RUN `FIREBASE SERVE` to get your api routes to test on postman
// `FIREBASE DEPLOY` TO CONSOLE.FIREBASE

// POLL ROUTES
app.get('/polls', getAllPolls);
app.post('/poll', FBAuth, createOnePoll);
// USER ROUTES
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.https.onRequest(app);
