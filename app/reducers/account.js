// @flow

import { loop, Effects } from 'redux-loop';
import * as types from '../actions/types';
import * as actions from '../actions/account';
import Api from '../lib/api';
import createReducer from '../lib/createReducer';

export type T = {| loading: boolean, numbers: Array<types.PhoneNumber>, error: any |};
export const initialState: T = { loading: false, numbers: [], error: {} };

export function fetchNumbers() {
  return Api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r => actions.successFetchAccountNumbers(
      r.incoming_phone_numbers.map(number => new types.PhoneNumber(number))
    ))
    .catch(e => actions.failFetchAccountNumbers(e));
}

export const reducer = createReducer({
  [types.FETCH_ACCOUNT_NUMBERS](state) {
    return loop(
      { ...state, loading: true },
      Effects.promise(fetchNumbers)
    );
  },
  [types.SET_FETCHED_ACCOUNT_NUMBERS](state, action) {
    return {
      ...state,
      numbers: action.fetchedAccountNumbers,
      error: {},
      loading: false,
    };
  },
  [types.FETCH_ACCOUNT_NUMBER_ERROR](state, action) {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  },
});
