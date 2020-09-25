import React, { useState }    from 'react'
import { connect }            from 'react-redux'
import styled                 from 'styled-components'

import Carousel               from 'components/Carousel'
import PhotosGrid             from 'components/PhotosGrid'
import Heading                from 'components/Heading'
import media                  from 'styledComponents/media'
import {
  specificCategoryStateToProps
}                             from 'helpers/stateToPropsMappers'


const TextWrapper = styled.div`
  margin: 30px 0;
  
  p{
    margin: 0 0 20px;
    font-weight: 300;
    font-size: 17px;
  }
`;

const ColumnsWrapper = styled.div`
  ${media.tablet`
    column-count: 2;
    column-gap: 60px;  
  `} 
`;

const Gallery = (
  {
    galleryCategories,
    photos:allPhotos,
    routePageCategory,
    lang,
    dispatch,
    isLightboxOpen
  }) => {
  const [pickedPhotoIndex, assignPhotoIndex] = useState(0);
  const toggleLightbox = (isOpen) => dispatch('isLightboxOpen', isOpen === undefined ? !isLightboxOpen : isOpen);
  
  const openSlideshow = (index) => {
    toggleLightbox(true);
    assignPhotoIndex(index)
  };

  const pageCategory = parseInt(routePageCategory);
  const selectedPhotosCategory = galleryCategories.find(el => el.id === pageCategory);
  if(!selectedPhotosCategory || galleryCategories.length === 0 || allPhotos.length === 0) return null;
  
  const filteredPhotos = allPhotos
    .map(el => ({...el, src: el.fullURL}))
    .filter(photo => selectedPhotosCategory ? photo.category === pageCategory : true )
    .sort((a,b) => a.order - b.order);

  const photosForGallery = filteredPhotos.map((photo) => ({...photo, src: photo.mediumURL}));

  const onNextClick = () => {
    assignPhotoIndex(pickedPhotoIndex >= filteredPhotos.length - 1 ? 0 : pickedPhotoIndex + 1)
  };
  const onPrevClick = () => {
    assignPhotoIndex(pickedPhotoIndex >= 0 ? pickedPhotoIndex - 1 : filteredPhotos.length - 2)
  };
  
  window.onkeydown = function (event) {
    if(event.code === "ArrowRight") onNextClick();
    if(event.code === "ArrowLeft") onPrevClick();
    if(event.code === "Escape") toggleLightbox(false);
  };

  return (
    <section>
      {!isLightboxOpen ?
        <>
          <Heading>{selectedPhotosCategory[lang].title}</Heading>
          <TextWrapper>
            <ColumnsWrapper dangerouslySetInnerHTML={{__html: selectedPhotosCategory[lang].description}} />
          </TextWrapper>
          <PhotosGrid specificWork photos={photosForGallery} onOpen={openSlideshow} />
        </>
        :
        <Carousel
          selected={pickedPhotoIndex}
          isOpen={isLightboxOpen}
          closeCarousel={() => toggleLightbox(false)}
          photos={filteredPhotos}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          assignPhotoIndex={assignPhotoIndex}
          lang={lang}
        />
      }
    </section>
  )
};

export default connect(
  specificCategoryStateToProps, dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })}))(Gallery);