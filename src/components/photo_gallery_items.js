import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import shouldComponentUpdate from 'react-addons-shallow-compare';

import {GridList} from 'material-ui';

import GalleryItem from './photo_gallery_item';

export default class GalleryItems extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    editable: PropTypes.bool.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired
  }

  constructor () {
    super();
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render () {
    const {photos, editable, confirmDelete, toggleSelected} = this.props;
    return (
      <GridList cellHeight={200}>
        {_.map(photos, photo => {
          return (
            <GalleryItem
              photo={photo}
              key={photo.id}
              onDelete={confirmDelete}
              toggleSelected={toggleSelected}
              editable={editable}
            />
          );
        })}
      </GridList>
    )
  }
}
