import { Effects, loop } from 'redux-loop';

import { reducer, initialState, fetchNumbers } from '../account';
import * as actions from '../../actions/account';
import * as types from '../../actions/types';

test('reducer.FETCH_ACCOUNT_NUMBERS', () => {
  const state = { ...initialState, loading: false };

  const result = reducer(state, actions.fetchAccountNumbers());

  expect(result).toEqual(loop(
    { ...initialState, loading: true },
    Effects.promise(fetchNumbers)
  ));
});

test('reducer.SET_FETCHED_ACCOUNT_NUMBERS', () => {
  const state = { ...initialState };
  const s = Symbol('fetched numbers');

  const result = reducer(state, actions.successFetchAccountNumbers(s));

  expect(result).toEqual({ ...initialState, numbers: s });
});

test('reducer.FETCH_ACCOUNT_NUMBER_ERROR', () => {
  const state = { ...initialState };
  const s = Symbol('error');

  const result = reducer(state, actions.failFetchAccountNumbers(s));

  expect(result).toEqual({ ...initialState, error: s });
});

test('reducer.SET_FETCHED_ACCOUNT_NUMBERS followed by reducer.FETCH_ACCOUNT_NUMBER_ERROR', () => {
  const state0 = { ...initialState };
  const s0 = Symbol('fetched numbers');
  const s1 = Symbol('error');

  const state1 = reducer(state0, actions.successFetchAccountNumbers(s0));
  const state2 = reducer(state1, actions.failFetchAccountNumbers(s1));

  expect(state2).toEqual({ ...initialState, numbers: s0, error: s1 });
});