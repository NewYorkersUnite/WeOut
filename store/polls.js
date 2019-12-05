const {firebaseApp, db, config} = require('../functions/util/config');
import {Alert} from 'react-native';
/**
 * ACTION TYPES
 */
const CREATED_POLL = 'CREATED_POLL';
const GOT_POLLS = 'GOT_POLLS';
const SUGGESTION_ADDED = 'SUGGESTION_ADDED';
const ERROR = 'ERROR';
const GOT_SUGGESTION = 'GOT_SUGGESTION';

/**
 * INITIAL STATE
 */
const defaultPoll = {
  polls: [],
  singlePoll: {},
  suggestions: [],
  voted: false,
};

/**
 * ACTION CREATORS
 */
const got_suggestion = (suggestions, voted) => {
  return {type: GOT_SUGGESTION, suggestions, voted};
};

const suggestion_added = suggestions => {
  return {type: SUGGESTION_ADDED, suggestions};
};

const created_poll = polls => {
  return {type: CREATED_POLL, polls};
};

const got_polls = polls => {
  return {type: GOT_POLLS, polls};
};

/**
 * THUNK CREATORS
 */
export const vote = (username, pollId, option) => async dispatch => {
  try {
    const pollData = await db.doc(`/polls/${pollId}`).get();
    const pollParticipants = pollData.data().participants;
    const remainingParticipants = [];
    pollParticipants.forEach(participant => {
      if (participant !== username) {
        remainingParticipants.push(participant);
      }
    });
    const suggestions = pollData.data().suggestions;

    let totalVote = 0;
    let newSuggestions = suggestions.map(element => {
      if (element.option === option) {
        element.voteCount = element.voteCount + 1;
      }
      totalVote += element.voteCount;
      return element;
    });

    newSuggestions.forEach(async element => {
      let percentage = (element.voteCount / totalVote) * 100;
      percentage = Math.floor(percentage * 100) / 100;
      element.percentage = percentage;
    });
    await db.doc(`/polls/${pollId}`).update({
      suggestions: newSuggestions,
      participants: remainingParticipants,
    });

    dispatch(got_suggestion(suggestions, true));
  } catch (err) {
    console.log(err);
    dispatch({type: ERROR});
  }
};

export const get_suggestions = (username, pollId) => async dispatch => {
  try {
    let voted = false;
    const pollData = await db.doc(`/polls/${pollId}`).get();
    const suggestions = pollData.data().suggestions;
    if (pollData.data().participants.includes(username)) {
      voted = false;
    } else {
      voted = true;
    }
    dispatch(got_suggestion(suggestions, voted));
  } catch (err) {
    console.log(err);
    dispatch({type: ERROR});
  }
};

export const add_suggestion = (pollId, suggestion) => async dispatch => {
  try {
    const pollData = await db.doc(`/polls/${pollId}`).get();
    const suggestions = pollData.data().suggestions;
    const suggestionObject = {
      option: suggestion,
      voteCount: 0,
      percentage: 0,
    };

    suggestions.push(suggestionObject);
    let totalVote = 0;
    suggestions.forEach(element => {
      totalVote += element.voteCount;
    });

    if (totalVote === 0) {
      suggestions.forEach(async element => {
        let percentage = 100 / suggestions.length;
        percentage = Math.floor(percentage * 100) / 100;
        element.percentage = percentage;
      });
      await db.doc(`/polls/${pollId}`).update({suggestions});
    } else {
      suggestions.forEach(async element => {
        let percentage = (element.voteCount / totalVote) * 100;
        percentage = Math.floor(percentage * 100) / 100;
        element.percentage = percentage;
      });
      await db.doc(`/polls/${pollId}`).update({suggestions});
    }

    dispatch(suggestion_added(suggestions));
  } catch (err) {
    console.log(err);
    dispatch({type: ERROR});
  }
};

export const get_polls = username => async dispatch => {
  try {
    const myData = await db.doc(`/users/${username}`).get();
    const myPollIds = myData.data().polls;
    const allPollsData = await db.collection('polls').get();
    const myPolls = [];
    allPollsData.forEach(element => {
      if (myPollIds.includes(element.id)) {
        myPolls.push({...element.data(), pollId: element.id});
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

//Helper function for createPoll
var add_minutes = function(dt, minutes) {
  return new Date(dt.getTime() + minutes * 60000);
};

export const create_poll = (username, poll, participants) => async dispatch => {
  try {
    poll.suggestions = [];
    const thisMoment = new Date();
    poll.endTime = add_minutes(thisMoment, poll.voteTimer);
    poll.participants = [...participants, username];
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
    const allPollsData = await db.collection('polls').get();
    const allPolls = [];
    allPollsData.docs.forEach(sPoll => {
      if (myPolls.includes(sPoll.data().pollId)) {
        allPolls.push(sPoll.data());
      }
    });
    dispatch(created_poll(allPolls));
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
    case SUGGESTION_ADDED: {
      return {...state, suggestions: action.suggestions};
    }
    case GOT_SUGGESTION: {
      return {...state, suggestions: action.suggestions, voted: action.voted};
    }
    case ERROR:
      return state;
    default:
      return state;
  }
}
