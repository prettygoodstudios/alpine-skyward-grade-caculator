import { combineReducers } from 'redux';

import skyward from "./skyward";

const rootReducer = combineReducers({
  state: (state = {}) => state,
  skyward
});

export default rootReducer;