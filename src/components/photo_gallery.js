import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import shouldComponentUpdate from 'react-addons-shallow-compare';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {RaisedButton, FontIcon} from 'material-ui';

import GalleryItems from './photo_gallery_items';

export default class PhotoGallery extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    editable: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    showDialog: PropTypes.func
  }

  constructor () {
    super();
    this.state = {
      photos: []
    };

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.confirmDelete = this.confirmDelete.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.confirmBulkDelete = this.confirmBulkDelete.bind(this);
  }

  componentWillMount () {
    this.setState({
      photos: this.props.photos
    });
  }

  toggleSelected (id) {
    const {photos} = this.state;

    return this.setState({
      photos: _.map(photos, photo => {
        if (photo.id === id) {
          return {
            ...photo,
            selected: !photo.selected
          };
        }
        return photo;
      })
    });
  }

  getSelectedPhotosCount () {
    return _.filter(this.state.photos, ['selected', true]).length;
  }

  confirmBulkDelete () {
    const {showDialog, onChange} = this.props;

    showDialog({
      title: 'Confirm bulk deletion',
      content: <div>Are you sure you want to delete <strong>{this.getSelectedPhotosCount()}</strong> images?</div>,
      onConfirm: () => {
        const photos = _.filter(this.state.photos, ['selected', false]);
        this.setState({ photos }, () => onChange(photos));
      }
    })
  }

  confirmDelete (id) {
    const {showDialog, onChange} = this.props;
    showDialog({
      title: 'Confirm deletion',
      content: 'Are you sure you want to delete? This cannot be undone!',
      onConfirm: () => {
        const photos = _.reject(this.state.photos, ['id', id]);
        this.setState({ photos }, () => onChange(photos));
      }
    })
  }

  render () {
    const {photos} = this.state;
    const {editable} = this.props;
    const selectedPhotosCount = this.getSelectedPhotosCount();

    return (
      <Row>
        <Row>
          <Col className='mui-col-md-10 mui-col-md-offset-1 mb-20 mui--text-right'>
            {editable &&
              <RaisedButton
                label="Delete Selected"
                icon={<FontIcon className="material-icons">delete</FontIcon>}
                disabled={!selectedPhotosCount}
                onTouchTap={this.confirmBulkDelete}
              />
            }
          </Col>
        </Row>
        <Row>
          <Col className='mui-col-md-10 mui-col-md-offset-1'>
            <GalleryItems
              photos={photos}
              editable={editable}
              confirmDelete={this.confirmDelete}
              toggleSelected={this.toggleSelected}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}
