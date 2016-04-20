import { createStore, combineReducers } from 'redux';

import dialog from './reducers/dialog';

export default createStore(
  combineReducers({
    dialog
  })
);
