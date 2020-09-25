import React                  from 'react'
import styled                 from 'styled-components'
import {connect}              from "react-redux";
import { Link }               from 'react-router-dom'

import MainCard               from './MainCard'
import ShowMoreButton         from "./ShowMoreButton";
import { misc }               from "../lang";
import Heading                from "./Heading";

import { CommingSoon }        from "styledComponents"
import media                  from 'styledComponents/media'

const VideosWrapper = styled.div`
  display: ${props => props.home ? "block" : "inline-grid"};
  ${props => props.home && "max-width: 650px"};
  width: calc(100%);
  margin: 0 auto;
  grid-template-columns: 1fr;
  ${media.mobile`
    grid-template-columns: 1fr 1fr;
  `};
  grid-gap: 30px;
`

const checkIfTrim = string => {
  const output = string.match(/<p>/g) || [];
  return output.length > 1
};

const AllVideos = ({ videos, home, lang, translatedLink }) => {
  const trimmedVideos = home ? videos.slice(0,1) : videos;
  if(videos.length === 0){
    return (
      <>
        <Heading centered home margin="60px 0 30px">{translatedLink.label}</Heading>
        <CommingSoon>{misc.commingSoon[lang]}</CommingSoon>
      </>
    )
  }
  return (
    <>
      <Heading centered home margin="60px 0 30px">{translatedLink.label}</Heading>
      <VideosWrapper home={home}>
        {
          trimmedVideos.map((el, index) => (
            <Link
              key={index}
              onClick={() => {window.scrollTo(0,0)}}
              to={`video/${el.vimeo_movie_id}`}
            >
              <MainCard
                home={home}
                trimDescription={checkIfTrim(el[lang].description)}
                labelPhoto={el.label_photos.big}
                name={el[lang].title}
                description={el[lang].description}
                isVideo
              />
            </Link>
          ))
        }
        {(home && videos.length > 1) &&
          <ShowMoreButton
            categoriesCount={10}
            onClick={() => window.scrollTo(0,0)}
            link={translatedLink.path}
          >
            {misc.showMore[lang]}
          </ShowMoreButton>}
      </VideosWrapper>
    </>
  )
}

export default connect(({ videos, lang }) => ({ videos, lang }), null)(AllVideos);
