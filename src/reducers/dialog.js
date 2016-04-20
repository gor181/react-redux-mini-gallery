import _ from 'lodash';
import {SHOW_DIALOG, HIDE_DIALOG} from '../constants/dialog';

export default function Dialog (state = { open: false }, action) {
  switch(action.type) {
    case SHOW_DIALOG:
      return {
        ..._.omit(action, 'type'),
        open: true
      };
    case HIDE_DIALOG:
      return {
        open: false
      };
  }
  return state;
}
