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
const ACCEPTED_FRIEND = 'ACCEPTED_FRIEND';
const REQUESTED_FRIEND = 'REQUESTED_FRIEND';

/**
 * INITIAL STATE
 */
const defaultUser = {
  currentUser: {},
  numOfFriends: 0,
  numOfNotifications: 0,
  logged_in: false,
  friends: [],
  users: [],
  availability: null, // Kaitlyn changed this from true
};

/**
 * ACTION CREATORS
 */
const logged_in = user => {
  return {type: LOGGED_IN, user};
};

const got_friends = (friends, numOfNotifications) => {
  return {type: GOT_FRIENDS, friends, numOfNotifications};
};

const got_users = users => {
  return {type: GOT_USERS, users};
};

const availability_toggled = availability => {
  return {type: AVAILABILITY_TOGGLED, availability};
};

const accepted_friend = () => {
  return {type: ACCEPTED_FRIEND};
};

const requested_friend = () => {
  return {type: REQUESTED_FRIEND};
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
        notifications: [],
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
    const friendData = await db.doc(`/users/${item.username}`).get();
    const friendNotifications = friendData.data().notifications;
    await friendNotifications.push(`${username} request to add you as friend`);
    await db
      .doc(`/users/${item.username}`)
      .update({notifications: friendNotifications});

    dispatch(requested_friend());
  } catch (err) {
    console.error(err);
    return {
      type: ERROR,
    };
  }
};

export const accept_friend = (username, friend, idx) => async dispatch => {
  try {
    const myData = await db.doc(`/users/${username}`).get();
    const myFriends = myData.data().friends;
    myFriends.push(friend);
    const myNotifications = myData.data().notifications;
    myNotifications.splice(idx, 1);
    await db
      .doc(`/users/${username}`)
      .update({friends: myFriends, notifications: myNotifications});

    const friendData = await db.doc(`/users/${friend}`).get();
    const friendFriends = friendData.data().friends;
    friendFriends.push(username);
    const friendNotifications = friendData.data().notifications;
    friendNotifications.push(`${username} accepted your friend request`);
    await db
      .doc(`/users/${friend}`)
      .update({friends: friendFriends, notifications: friendNotifications});

    const friendsData = await db.doc(`/users/${username}`).get();
    const friends = friendsData.data().friends;
    const numOfNotifications = myData.data().notifications.length;
    dispatch(got_friends(friends, numOfNotifications));
  } catch (err) {
    console.error(err);
    return {
      type: ERROR,
    };
  }
};

export const deny_friend = (username, idx) => async dispatch => {
  const myData = await db.doc(`/users/${username}`).get();
  const myFriends = myData.data().friends;
  const myNotifications = myData.data().notifications;
  myNotifications.splice(idx, 1);
  await db.doc(`/users/${username}`).update({notifications: myNotifications});
  const numOfNotifications = myData.data().notifications.length;
  dispatch(got_friends(myFriends, numOfNotifications));
};

export const getFriends = username => async dispatch => {
  try {
    const myData = await db.doc(`/users/${username}`).get();
    const friends = myData.data().friends;
    const numOfNotifications = myData.data().notifications.length;
    dispatch(got_friends(friends, numOfNotifications));
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
      return {
        ...state,
        friends: action.friends,
        numOfFriends,
        numOfNotifications: action.numOfNotifications,
      };
    }
    case AVAILABILITY_TOGGLED: {
      return {...state, availability: action.availability};
    }
    case GOT_USERS: {
      return {...state, users: action.users};
    }
    case REQUESTED_FRIEND: {
      return state;
    }
    case ERROR:
      return state;
    default:
      return state;
  }
}
