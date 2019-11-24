/*eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();
const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyC6DlzxjOzVes3LyqG3jIimqf7DJXTnLsI',
  authDomain: 'weout-388d2.firebaseapp.com',
  databaseURL: 'https://weout-388d2.firebaseio.com',
  projectId: 'weout-388d2',
  storageBucket: 'weout-388d2.appspot.com',
  messagingSenderId: '38624261238',
  appId: '1:38624261238:web:edf6024858e5cf7b059b57',
  measurementId: 'G-87HFC28KC6',
};

firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

// remember to cd into firebase dir!!
// IN TERMINAL RUN `FIREBASE SERVE` to get your api routes to test on postman
// `FIREBASE DEPLOY` TO CONSOLE.FIREBASE

// GET REQUEST
app.get('/polls', (req, res) => {
  db.collection('polls')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let polls = [];
      data.forEach(doc => {
        polls.push({
          pollId: doc.id,
          body: doc.data().body,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(polls);
    })
    .catch(error => console.log(error));
});

// POST REQUEST
app.post('/poll', (req, res) => {
  const newPoll = {
    body: req.body.body,
    userId: req.body.userId,
    createdAt: new Date().toISOString(),
  };

  db.collection('polls')
    .add(newPoll)
    .then(doc => {
      res.json({message: `document ${doc.id} created SUCCESSFULLY`});
    })
    .catch(error => {
      res.status(500).json({error: 'something went wrong'});
      console.log(error);
    });
});

// HELPER FUNCTIONS TO USE IN SIGN UP ROUTES
const isEmpty = string => {
  if (string.trim() === '') return true;
  else return false;
};
const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

// SIGN UP ROUTE
app.post('/signup', (req, res) => {
  // this part is to place the new user info into the auth
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };

  let errors = {};

  // THESE ARE THE EQUIVALENT OF VALIDATORS FROM SEQUELIZE
  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = 'Password must match';
  if (isEmpty(newUser.username)) errors.username = 'Must not be empty';
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  //~~~~~~~

  let token; // initialize a token
  let userId; // initialize a userId

  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({username: 'This username has already been taken'});
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;

      const userCredentials = {
        // this part is to place the new user info into the db
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId,
      };
      return db
        .doc(`/users/${newUser.username}`)
        .set(userCredentials)
        .then(() => {
          return res.status(201).json({token});
        });
    })
    .catch(error => {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        return res.status(400).json({email: 'Email is already in use'});
      } else {
        return res.status(500).json({error: error.code});
      }
    });
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};

  // LOGIN VALIDATORS
  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  // ~~~~~

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(error => {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        return res
          .status(403)
          .json({general: 'Wrong credentials, please try again'});
      } else return res.status(500).json({error: error.code});
    });
});

exports.api = functions.https.onRequest(app);
