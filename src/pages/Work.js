import React, { Component }         from 'react'
import { connect }                  from 'react-redux';
import { withRouter }               from "react-router-dom";

import GalleryCategories            from '../components/GalleryCategories'
import SpecificCategory             from '../components/SpecificCategory'
import Heading                      from 'components/Heading'

import { getLinks, getPhotos }      from 'requests'
import {
  isEmpty,
  workStateToProps
}                                   from 'helpers'

class Work extends Component {

  componentDidMount = async () => {
    const { galleryCategories, photos, dispatch } = this.props;
    if(isEmpty(galleryCategories) && isEmpty(photos)){
      const [photos, galleryCategories] = await Promise.all([
        getPhotos(),
        getLinks()
      ]);

      const sortedGalleryCategories = galleryCategories.sort((a,b) => a.order - b.order);

      dispatch('photos', photos );
      dispatch('galleryCategories', sortedGalleryCategories );
    }
  };

  render(){
    const routePageCategory = this.props.match?.params?.category;
    const { title } = this.props;
    console.log('routePageCategory', routePageCategory)
    return !routePageCategory ?
      <>
        <Heading>{title}</Heading>
        <GalleryCategories />
      </>
    :
      <SpecificCategory routePageCategory={routePageCategory} />
  }
}

export default connect(
  workStateToProps,
  dispatch => ({ dispatch: (key, value) => dispatch({ type: key, value })})
)(withRouter(Work));
