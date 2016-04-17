import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import shouldComponentUpdate from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';

import ConfirmDialog from './components/confirm_dialog';
import PhotoGallery from './components/photo_gallery';

import {showDialog} from './actions/dialog';

const generatePhotos = (amount = 20) => {
  return _.map(_.range(0, amount), id => ({
    id,
    fileUrl: `https://unsplash.it/200/300/?image=${id}`,
    selected: false
  }));
}

class Layout extends Component {

  static propTypes = {
    showDialog: PropTypes.func
  }

  constructor () {
    super();
    this.onProfileGalleryUpdate = this.onProfileGalleryUpdate.bind(this);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onProfileGalleryUpdate (images) { // eslint-disable-line no-unused-vars
    //TODO Use the data.
  }

  render () {
    return (
      <div className='container'>
       <Row>
         <Col md='6' md-offset='3'>
           <div className='mui--text-display1 headline'>
             Photo Gallery
           </div>
           <Panel>
             <PhotoGallery
               photos={generatePhotos(25)}
               onChange={this.onProfileGalleryUpdate}
               editable={true}
               {...this.props}
             />
          </Panel>
         </Col>
       </Row>
       <ConfirmDialog />
      </div>
    );
  }
}

export default connect(
  undefined,
  dispatch => bindActionCreators({ showDialog }, dispatch)
)(Layout);
