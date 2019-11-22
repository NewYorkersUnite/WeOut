import firebase from 'firebase/app';
// import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

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
// const db = firebase.database()
firebase.firestore();
// firebase.analytics()

export default firebase;
