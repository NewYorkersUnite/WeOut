const {firebaseApp, db, config} = require('../functions/util/config');
import {Alert} from 'react-native';

/**
 * ACTION TYPES
 */
const LOGGED_IN = 'LOGGED_IN';
const GOT_FRIENDS = 'GOT_FRIENDS';
const ERROR = 'ERROR';
const GOT_USERS = 'GOT_USERS';
const AVAILABILITY_TOGGLED = 'AVAILABILITY_TOGGLED';
/**
 * INITIAL STATE
 */
const defaultUser = {
  currentUser: {},
  numOfFriends: 0,
  logged_in: false,
  friends: [],
  users: [],
  availability: true,
};

/**
 * ACTION CREATORS
 */
const logged_in = user => {
  return {type: LOGGED_IN, user};
};

const got_friends = friends => {
  return {type: GOT_FRIENDS, friends};
};

const got_users = users => {
  return {type: GOT_USERS, users};
};

const availability_toggled = availability => {
  return {type: AVAILABILITY_TOGGLED, availability};
};
/**
 * THUNK CREATORS
 */
export const toggle_availability = username => async dispatch => {
  const availabilityData = await db.doc(`/users/${username}`).get();
  const availability = availabilityData.data().available;
  const newAvailability = !availability;
  await db.doc(`/users/${username}`).update({available: newAvailability});
  dispatch(availability_toggled(newAvailability));
};

export const get_users = () => async dispatch => {
  const usersData = await db.collection('/users').get();
  const users = [];
  usersData.docs.forEach(element => {
    users.push(element.data());
  });
  dispatch(got_users(users));
};

export const sign_up = newUser => async dispatch => {
  const noImg = 'no-img.png';
  try {
    let user = await db.doc(`/users/${newUser.username}`).get();
    if (user.data()) {
      Alert.alert('Username is taken.');
    } else {
      const data = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
      const userId = data.user.uid;
      const userCredentials = {
        // this part is to place the new user info into the db
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId: userId,
        available: true,
        friends: [],
      };
      await db.doc(`/users/${newUser.username}`).set(userCredentials);
      const userData = await db
        .collection('users')
        .where('email', '==', newUser.email)
        .get();
      user = userData.docs[0].data();
      dispatch(logged_in(user));
    }
  } catch (err) {
    console.error(err);
    dispatch({type: ERROR});
  }
};

export const login = (email, password) => async dispatch => {
  try {
    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    const userData = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    const user = userData.docs[0].data();
    dispatch(logged_in(user));
  } catch (err) {
    console.error(err);
    console.log('Wrong credentials, please try again', err.toString());
    return {
      type: ERROR,
    };
  }
};

export const addFriend = (username, item) => async dispatch => {
  try {
    const currentFriendsData = await db.doc(`/users/${username}`).get();
    const currentfriends = currentFriendsData.data().friends;
    currentfriends.push(item.username);
    await db.doc(`/users/${username}`).update({friends: currentfriends});
    const friendsData = await db.doc(`/users/${username}`).get();
    // console.log('GET FRIENDS', friends.docs[0].data());
    const friends = friendsData.data().friends;
    // friendsData.docs.forEach(element => {
    //   friends.push(element.data());
    // });
    dispatch(got_friends(friends));
  } catch (err) {
    console.error(err);
    return {
      type: ERROR,
    };
  }
};

export const getFriends = username => async dispatch => {
  try {
    const friendsData = await db.doc(`/users/${username}`).get();
    // console.log('GET FRIENDS', friends.docs[0].data());
    const friends = friendsData.data().friends;
    // friendsData.docs.forEach(element => {
    //   friends.push(element.data());
    // });
    dispatch(got_friends(friends));
  } catch (err) {
    console.error(err);
    return {
      type: ERROR,
    };
  }
};
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case LOGGED_IN: {
      return {...state, currentUser: action.user, logged_in: true};
    }
    case GOT_FRIENDS: {
      const numOfFriends = action.friends.length;
      return {...state, friends: action.friends, numOfFriends};
    }
    case AVAILABILITY_TOGGLED: {
      return {...state, availability: action.availability};
    }
    case GOT_USERS: {
      return {...state, users: action.users};
    }
    case ERROR:
      return state;
    default:
      return state;
  }
}
