import React, { Component } from 'react'
import { connect }          from 'react-redux';
import Vimeo                from '@u-wave/react-vimeo';
import styled               from 'styled-components'

import { CommingSoon }      from "styledComponents"
import Videos               from 'components/AllVideos'
import Heading              from 'components/Heading'

import { getVideos }        from "requests";
import { isEmpty }          from "helpers";
import { misc }             from "lang"

const VideoWrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Paragraph = styled.p`
  font-size: 17px;
  color: #5A5857;
  font-weight: 500;
  margin-bottom: 20px;
`;

class Video extends Component {

  componentDidMount = async () => {
    if(this.props.videos.length === 0){
      const videos = await getVideos();
      this.props.dispatch('videos', videos)
    }
  };


  render(){
    const { lang, home, videos } = this.props;
    const category = this.props.match?.params?.category;

    const vid = category && videos.find(el => el.vimeo_movie_id === category);

    if(isEmpty(videos)){
      return (
        <>
          {vid && <Heading>{vid[lang]?.title}</Heading>}
          <CommingSoon>{misc.commingSoon[lang]}</CommingSoon>
        </>
      )
    }
    return (!category) ?
      <><Videos /></>
    :
      <>
        {vid && <Heading>{vid[lang]?.title}</Heading>}
        <VideoWrapper home={home}>
          {vid && <Paragraph>{vid[lang]?.description}</Paragraph>}
          <Vimeo video={category} responsive />
        </VideoWrapper>
      </>
  }
}

export default connect(
  ({ lang, videos }) => ({ lang, videos }),
    dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })})
)(Video)
