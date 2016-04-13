import React, {Component, PropTypes} from 'react';

import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

import {openURL} from '../helpers/url';

const TITLE_BACKGROUND = 'rgba(255, 255, 255, 0.76)';

export default class PhotoGallery extends Component {
  static propTypes = {
    photo: PropTypes.shape({
      id: PropTypes.number,
      fileUrl: PropTypes.string,
      selected: PropTypes.bool
    }).isRequired,
    editable: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired
  }

  constructor () {
    super();
    this.deleteImage = this.deleteImage.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.openImage = this.openImage.bind(this);
  }

  shouldComponentUpdate (nextProps) {
    return this.props.photo !== nextProps.photo;
  }

  deleteImage () {
    this.props.onDelete(this.props.photo.id);
  }

  onCheck () {
    this.props.toggleSelected(this.props.photo.id);
  }

  openImage () {
    openURL(this.props.photo.fileUrl);
  }

  renderActionsIcons () {
    const {photo: {selected}} = this.props;
    return (
      <div>
        <IconButton>
          <Checkbox color="white" onCheck={this.onCheck} checked={selected}/>
        </IconButton>
        <IconButton onClick={this.deleteImage}>
          <FontIcon className="material-icons">delete</FontIcon>
        </IconButton>
      </div>
    );
  }

  render () {
    const {photo: {id, fileUrl}, editable} = this.props;
    return (
      <GridTile
        title={<div></div>}
        titleBackground={editable ? TITLE_BACKGROUND : ''}
        actionIcon={editable ? this.renderActionsIcons(id) : null}
      >
        <img src={fileUrl} onClick={this.openImage} className='pointer' />
      </GridTile>
    );
  }
}
