import React, {Component, PropTypes} from 'react';
import shouldComponentUpdate from 'react-addons-shallow-compare';

import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

import {openURL} from '../helpers/url';

const TITLE_BACKGROUND = 'rgba(255, 255, 255, 0.76)';

export default class PhotoGallery extends Component {
  static propTypes () {
    return {
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      editable: PropTypes.bool,
      onDelete: PropTypes.func.isRequired,
      toggleSelected: PropTypes.func.isRequired,
      isSelected: PropTypes.bool.isRequired
    };
  }

  constructor () {
    super();
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.openImage = this.openImage.bind(this);
  }

  deleteImage () {
    this.props.onDelete(this.props.id);
  }

  onCheck () {
    this.props.toggleSelected(this.props.id);
  }

  openImage () {
    openURL(this.props.url);
  }

  renderActionsIcons () {
    const {isSelected} = this.props;
    return (
      <div>
        <IconButton>
          <Checkbox color="white" onCheck={this.onCheck} checked={isSelected}/>
        </IconButton>
        <IconButton onClick={this.deleteImage}>
          <FontIcon className="material-icons">delete</FontIcon>
        </IconButton>
      </div>
    );
  }

  render () {
    const {id, url, editable} = this.props;
    return (
      <GridTile
        title={<div></div>}
        titleBackground={editable ? TITLE_BACKGROUND : ''}
        actionIcon={editable ? this.renderActionsIcons(id) : null}
      >
        <img src={url} onClick={this.openImage} className='pointer' />
      </GridTile>
    );
  }
}
