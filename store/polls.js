const {firebaseApp, db, config} = require('../functions/util/config');
import {Alert} from 'react-native';

/**
 * ACTION TYPES
 */

const OPTION_ONE_VOTE = 'OPTION_ONE_VOTE';
const OPTION_TWO_VOTE = 'OPTION_TWO_VOTE';
const OPTION_THREE_VOTE = 'OPTION_THREE_VOTE';

/**
 * INITIAL STATE
 */
const defaultPoll = {
  optionOne: '',
  optionTwo: '',
  optionThree: '',
};

/**
 * ACTION CREATORS
 */ export const voteOptionOne = () => {
  return {
    type: OPTION_ONE_VOTE,
  };
};
export const voteOptionTwo = () => {
  return {
    type: OPTION_TWO_VOTE,
  };
};
export const voteOptionThree = () => {
  return {
    type: OPTION_THREE_VOTE,
  };
};

export default (state = defaultPoll, action) => {
  switch (action.type) {
    case OPTION_ONE_VOTE:
      return Object.assign({}, state, {
        optionOne: state.optionOne + 1,
      });
    case OPTION_TWO_VOTE:
      return Object.assign({}, state, {
        optionTwo: state.optionTwo + 1,
      });
    case OPTION_THREE_VOTE:
      return Object.assign({}, state, {
        optionThree: state.optionThree + 1,
      });
    default:
      return state;
  }
};
