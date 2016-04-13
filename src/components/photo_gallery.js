import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import shouldComponentUpdate from 'react-addons-shallow-compare';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import GridList from 'material-ui/lib/grid-list/grid-list';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

import GalleryItem from './photo_gallery_item';

export default class PhotoGallery extends Component {
  static propTypes () {
    return {
      photos: PropTypes.array.isRequired,
      editable: PropTypes.bool.isRequired,
      onChange: PropTypes.func.isRequired,
      showDialog: PropTypes.func
    };
  }

  constructor () {
    super();
    this.state = {
      photos: [],
      selected: []
    };

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.confirmDelete = this.confirmDelete.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.confirmBulkDelete = this.confirmBulkDelete.bind(this);
  }

  componentWillMount () {
    this.setState({
      photos: this.props.photos
    });
  }

  isSelected (id) {
    return this.state.selected.indexOf(id) >= 0;
  }

  toggleSelected (id) {
    const {state} = this;

    if (this.isSelected(id)) {
      return this.setState({
        ...state,
        selected: _.without(state.selected, id)
      });
    }

    this.setState({
      ...state,
      selected: [
        ...state.selected,
        id
      ]
    });
  }

  omitPhotos (ids) {
    return _.filter(this.state.photos, (photo) => {
      return ids.indexOf(photo.id) < 0;
    })
  }

  confirmBulkDelete () {
    const {state} = this;
    const {showDialog, onChange} = this.props;
    showDialog({
      title: 'Confirm bulk deletion',
      content: <div>Are you sure you want to delete <strong>{state.selected.length}</strong> images?</div>,
      onConfirm: () => {
        const photos = this.omitPhotos(state.selected);
        this.setState({
          ...state,
          selected: [],
          photos
        }, () => onChange(photos));
      }
    })
  }

  confirmDelete (id) {
    const {state} = this;
    const {showDialog, onChange} = this.props;
    showDialog({
      title: 'Confirm deletion',
      content: 'Are you sure you want to delete? This cannot be undone!',
      onConfirm: () => {
        const photos = this.omitPhotos([id]);
        this.setState({
          ...state,
          photos
        }, () => onChange(photos));
      }
    })
  }

  render () {
    const {photos, selected} = this.state;
    const {editable} = this.props;
    return (
      <Row>
        <Row>
          <Col md={10} md-offset={1} className='mb-20 mui--text-right'>
            {editable &&
              <RaisedButton
                label="Delete Selected"
                icon={<FontIcon className="material-icons">delete</FontIcon>}
                disabled={!selected.length}
                onClick={this.confirmBulkDelete}
              />
            }
          </Col>
        </Row>
        <Row>
          <Col md={10} md-offset={1}>
            <GridList cellHeight={200}>
              {_.map(photos, (photo, index) => {
                return (
                  <GalleryItem
                    id={photo.id}
                    url={photo.fileUrl}
                    key={index}
                    onDelete={this.confirmDelete}
                    toggleSelected={this.toggleSelected}
                    isSelected={this.isSelected(photo.id)}
                    editable={editable}
                  />
                );
              })}
            </GridList>
          </Col>
        </Row>
      </Row>
    );
  }
}
