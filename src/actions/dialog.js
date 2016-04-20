import {SHOW_DIALOG, HIDE_DIALOG} from '../constants/dialog';

export function showDialog (opts) {
  return {
    type: SHOW_DIALOG,
    ...opts
  }
}

export function hideDialog () {
  return {
    type: HIDE_DIALOG
  }
}
