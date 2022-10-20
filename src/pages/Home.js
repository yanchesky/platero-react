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
  state = {
    isLoading: true
  }
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
    this.setState({isLoading: false})

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
        <GalleryCategories isLoading={this.state.isLoading} home translatedLink={galleryLink} />
        <Exhibitions isLoading={this.state.isLoading} home exhibitions={exhibitions} translatedLink={exhibitionsLink} />
        <Exhibitions isLoading={this.state.isLoading} home exhibitions={news} translatedLink={newsLink} />
        <Videos isLoading={this.state.isLoading} home translatedLink={videosLink} />
      </>
    )
  };
}

export default connect(
  homeStateToProps,
  dispatch => ({ dispatch: (key, value) => dispatch({ type: key, value })})
)(Home)