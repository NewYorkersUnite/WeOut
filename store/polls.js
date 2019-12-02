const {firebaseApp, db, config} = require('../functions/util/config');
import {Alert} from 'react-native';
/**
 * ACTION TYPES
 */
const CREATED_POLL = 'CREATED_POLL';
const GOT_POLLS = 'GOT_POLLS';
const ERROR = 'ERROR';

/**
 * INITIAL STATE
 */
const defaultPoll = {
  polls: [],
};

/**
 * ACTION CREATORS
 */
const created_poll = polls => {
  return {type: CREATED_POLL, polls};
};

const got_polls = polls => {
  return {type: GOT_POLLS, polls};
};

/**
 * THUNK CREATORS
 */
export const get_polls = username => async dispatch => {
  try {
    const myData = await db.doc(`/users/${username}`).get();
    const myPollIds = myData.data().polls;
    const allPollsData = await db.collection('polls').get();
    const myPolls = [];
    allPollsData.forEach(element => {
      if (myPollIds.includes(element.id)) {
        myPolls.push(element.data());
      }
    });
    dispatch(got_polls(myPolls));
  } catch (err) {
    console.log(err);
    dispatch({
      type: ERROR,
    });
  }
};

export const create_poll = (username, poll, participants) => async dispatch => {
  try {
    const pollData = await db.collection('polls').add(poll);
    const pollId = pollData.id;

    await participants.forEach(async participant => {
      const participantData = await db.doc(`/users/${participant}`).get();
      const participantNotifications = participantData.data().notifications;
      participantNotifications.push(`${username} has invited you to a poll`);
      const participantPolls = participantData.data().polls;
      participantPolls.push(pollId);
      await db.doc(`/users/${participant}`).update({
        polls: participantPolls,
        notifications: participantNotifications,
      });
    });
    const myData = await db.doc(`users/${username}/`).get();
    const myPolls = myData.data().polls;
    myPolls.push(pollId);
    await db.doc(`/users/${username}`).update({polls: myPolls});
    dispatch(created_poll(myPolls));
  } catch (err) {
    console.log(err);
    dispatch({
      type: ERROR,
    });
  }
};

/**
 * REDUCER
 */
export default function(state = defaultPoll, action) {
  switch (action.type) {
    case CREATED_POLL: {
      return {...state, polls: action.polls};
    }
    case GOT_POLLS: {
      return {...state, polls: action.polls};
    }
    case ERROR:
      return state;
    default:
      return state;
  }
}
