const {firebaseApp, db, config} = require('../functions/util/config');

/**
 * ACTION TYPES
 */
const LOGGED_IN = 'LOGGED_IN';
const ADDED_FRIEND = 'ADDED_FRIEND';
const GOT_FRIENDS = 'GOT_FRIENDS';
const ERROR = 'ERROR';

/**
 * INITIAL STATE
 */
const defaultUser = {
  currentUser: {},
  logged_in: false,
  friends: [],
};

/**
 * ACTION CREATORS
 */
const logged_in = user => {
  return {type: LOGGED_IN, user};
};

const added_friend = () => {
  return {type: ADDED_FRIEND};
};

const got_friends = friends => {
  return {type: GOT_FRIENDS, friends};
};

/**
 * THUNK CREATORS
 */
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
    await db.doc(`/users/${username}/friends/${item.username}`).set(item);
    dispatch(added_friend());
  } catch (err) {
    console.error(err);
    return {
      type: ERROR,
    };
  }
};

//bottomnav@email.com
export const getFriends = username => async dispatch => {
  try {
    const friendsData = await db
      .collection('users')
      .doc(username)
      .collection('friends')
      .get();
    // console.log('GET FRIENDS', friends.docs[0].data());
    const friends = [];
    friendsData.docs.forEach(element => {
      friends.push(element.data());
    });
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
    case ADDED_FRIEND: {
      return state;
    }
    case GOT_FRIENDS: {
      return {...state, friends: action.friends};
    }
    case ERROR:
      return state;
    default:
      return state;
  }
}
