import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import shouldComponentUpdate from 'react-addons-shallow-compare';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/dialog';

class ConfirmDialog extends Component {

  static propTypes = {
    dialog: PropTypes.shape({
      title: PropTypes.func.isRequried,
      onConfirm: PropTypes.func,
      content: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
      ]),
      open: PropTypes.bool
    }),
    hideDialog: PropTypes.func
  }

  constructor () {
    super();
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm () {
    this.props.hideDialog();
    this.props.dialog.onConfirm();
  }

  render () {
    const {dialog, hideDialog} = this.props;

    if (!dialog.open) {
      return null;
    }

    const {dialog: {title, open, content}} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={hideDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleConfirm}
      />
    ];

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}
      >
        {content}
      </Dialog>
    );
  }
}

ConfirmDialog.defaultProps = {
  onConfirm: _.noop
}

export default connect(
  state => ({ dialog: state.dialog }),
  dispatch => bindActionCreators(actions, dispatch)
)(ConfirmDialog);
