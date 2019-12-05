const {firebaseApp, db, config} = require('../functions/util/config');
import {Alert} from 'react-native';
/**
 * ACTION TYPES
 */
const EVENT_CREATED = 'EVENT_CREATED';
const GOT_EVENTS = 'GOT_EVENTS';
const ERROR = 'ERROR';

/**
 * INITIAL STATE
 */
const defaultEvents = {
  events: [],
};

/**
 * ACTION CREATORS
 */
const event_created = events => {
  return {type: EVENT_CREATED, events};
};

const got_events = events => {
  return {
    type: GOT_EVENTS,
    events,
  };
};

/**
 * THUNK CREATORS
 */
export const get_events = eventsIds => async dispatch => {
  try {
    const allEventsData = await db.collection('events').get();
    const myEvents = [];
    allEventsData.forEach(event => {
      if (eventsIds.includes(event.id)) {
        myEvents.push(event.data());
      }
    });
    dispatch(got_events(myEvents));
  } catch (err) {
    console.log(err);
    dispatch({
      type: ERROR,
    });
  }
};

export const create_event = poll => async dispatch => {
  const allEventsData = await db.collection('events').get();
  allEventsData.forEach(event => {
    if (poll.pollId === event.id) {
      dispatch({type: ERROR});
      return;
    }
  });
  try {
    let winningVote = '';
    let highest = 0;
    poll.suggestions.forEach(element => {
      if (element.percentage > highest) {
        winningVote = element.option;
      }
    });
    const event = {
      themeTitle: poll.themeTitle,
      chosenDate: poll.chosenDate,
      winningVote,
    };
    await db.doc(`events/${poll.pollId}`).set(event);
    dispatch(event_created(event));
  } catch (err) {
    console.log(err);
    dispatch({type: ERROR});
  }
};

/**
 * REDUCER
 */
export default function(state = defaultEvents, action) {
  switch (action.type) {
    case GOT_EVENTS: {
      return {...state, events: action.events};
    }
    case EVENT_CREATED:
      return {...state, events: [...state.events, action.event]};
    case ERROR:
      return state;
    default:
      return state;
  }
}
