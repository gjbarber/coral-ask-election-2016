// arrow-body-style discourages nesting, making complex reducers hard to read
/* eslint-disable arrow-body-style */
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import omitKeys from '../utils/omit-keys';

/**
 * Summary reducer
 */
export const summary = handleActions({
  REQUEST_DATA: () => ({
    isFetching: true
  }),

  RECEIVE_DATA: (state, action) => ({
    payload: action.payload,
    isFetching: false
  })
}, {
  isFetching: false
});

export const selected = handleActions({
  SELECT_EMOJI: (state, action) => {
    if (state === action.payload) {
      return null;
    }
    return action.payload;
  }
}, null);

export const responses = handleActions({
  RECEIVE_DATA: (state, action) => {
    return action.payload.latest.reduce((carry, response) => {
      return Object.assign({}, carry, {
        [response.response_id]: omitKeys(response, ['response_id'])
      });
    }, state);
  }
}, {});

export default combineReducers({
  summary,
  selected,
  responses
});
