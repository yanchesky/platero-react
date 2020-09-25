import React                from 'react'
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom'
import styled               from 'styled-components'

import MainCard             from 'components/MainCard'
import ShowMoreButton       from 'components/ShowMoreButton'
import media                from 'styledComponents/media'

import { misc }             from 'lang'
import Heading              from "./Heading";

const CategoriesWrapper = styled.div`
  opacity: 1;
  transition: opacity 2s ease-in;
  z-index: 1;
  display: inline-grid;
  width: calc(100%);
  grid-template-columns: 1fr;

  a:nth-child(5), a:nth-child(6) {
      display: ${props => props.isMoreContent ? "none" : "block"};
    }

  ${media.mobile`
    grid-template-columns: 1fr 1fr;
  `}
  ${media.desktop`
    grid-template-columns: 1fr 1fr 1fr;
    a:nth-child(5), a:nth-child(6) {
      display: block;
    }
  `}
  grid-gap: 30px;
`

const generateLink = (loc, id, translatedLink) => {
  const route = loc.pathname.split("/");
  if(route[1].length > 0){
    return `${route[1]}/${id ? id : ""}`
  }else{
    return `${translatedLink.path}/${id ? id : ""}`
  }
};

const GalleryCategories = ({ galleryCategories, home, translatedLink, lang }) => {
  const isMoreContent = home && galleryCategories.length > 4;
  const filteredCategories = isMoreContent ? galleryCategories.slice(0, 6) : galleryCategories;
  return (
    <>
      {translatedLink && <Heading home margin="60px 0 30px">{translatedLink.label}</Heading>}
      <CategoriesWrapper isMoreContent={isMoreContent}>
        {
          filteredCategories.map((photoCategory, index) => (
            <Link
              key={index}
              onClick={() => {window.scrollTo(0,0)}}
              to={(loc) => generateLink(loc, photoCategory.id, translatedLink)}
            >
              <MainCard
                isWork
                labelPhoto={photoCategory.labelPhotos.thumbnail}
                name={photoCategory[lang].title}
              />
            </Link>
            )
          )
        }
        {
          home &&
            <ShowMoreButton
              categoriesCount={galleryCategories.length}
              link={translatedLink.path}
              isWork
            >
              {misc.showMore[lang]}
            </ShowMoreButton>
        }
      </CategoriesWrapper>
    </>
  )
};

export default connect(
  ({ galleryCategories, lang }) => ({ galleryCategories, lang }),
  dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })})
)(GalleryCategories);