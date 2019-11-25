import firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyC6DlzxjOzVes3LyqG3jIimqf7DJXTnLsI',
  authDomain: 'weout-388d2.firebaseapp.com',
  databaseURL: 'https://weout-388d2.firebaseio.com',
  projectId: 'weout-388d2',
  storageBucket: 'weout-388d2.appspot.com',
  messagingSenderId: '38624261238',
  appId: '1:38624261238:web:edf6024858e5cf7b059b57',
  measurementId: 'G-87HFC28KC6',
};
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

module.exports = {firebaseApp, db, config};
