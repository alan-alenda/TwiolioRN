import {
  FETCH_ACCOUNT_NUMBERS,
  SET_FETCHED_ACCOUNT_NUMBERS,
  FETCH_ACCOUNT_NUMBER_ERROR,
} from '../types';

test('consts are not undefined', () => {
  expect(FETCH_ACCOUNT_NUMBERS).toBeDefined();
  expect(SET_FETCHED_ACCOUNT_NUMBERS).toBeDefined();
  expect(FETCH_ACCOUNT_NUMBER_ERROR).toBeDefined();
});