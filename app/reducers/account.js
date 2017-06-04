// @flow

import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export type T = {|
  selectedNumber: ?string,
|};
export const initialState: T = {
  selectedNumber: null,
};

export const reducer = createReducer({
  [types.SELECT_NUMBER](state, action) {
    return {
      ...state,
      selectedNumber: action.selectedNumber,
    };
  },
});
