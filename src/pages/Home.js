import React, { Component }             from 'react'
import { connect }                      from "react-redux";

import GalleryCategories                from 'components/GalleryCategories'
import Exhibitions                      from 'components/Exhibitions'
import Videos                           from 'components/AllVideos'
import FullscreenImage                  from 'components/FullscreenImage'
import {
  getExhibitions,
  getLinks,
  getLiterature,
  getNews,
  getPhotos,
  getVideos
}                                       from "requests";
import { isEmpty }                      from "helpers";
import { homeStateToProps }             from "helpers/stateToPropsMappers"

class Home extends Component {
  async componentDidMount() {
    const [
      photos,
      galleryCategories,
      exhibitions,
      videos,
      literature,
      news
    ] = await Promise.all([
      getPhotos(),
      getLinks(),
      getExhibitions(),
      getVideos(),
      getLiterature(),
      getNews()
    ]);


    this.props.dispatch( 'photos', photos );
    this.props.dispatch( 'galleryCategories', galleryCategories );
    this.props.dispatch( 'exhibitions', exhibitions );
    this.props.dispatch( 'videos', videos );
    this.props.dispatch( 'literature', literature );
    this.props.dispatch( 'news', news );
  }

  render(){
    const { exhibitions, translatedLinks=[], news } = this.props;

    if(isEmpty(translatedLinks)) return null;
    
    const [galleryLink, exhibitionsLink, newsLink, videosLink] = translatedLinks;

    return (
      <>
        <FullscreenImage />
        <GalleryCategories home translatedLink={galleryLink} />
        <Exhibitions home exhibitions={exhibitions} translatedLink={exhibitionsLink} />
        <Exhibitions home exhibitions={news} translatedLink={newsLink} />
        <Videos home translatedLink={videosLink} />
      </>
    )
  };
}

export default connect(
  homeStateToProps,
  dispatch => ({ dispatch: (key, value) => dispatch({ type: key, value })})
)(Home)