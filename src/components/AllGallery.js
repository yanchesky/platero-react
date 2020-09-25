import React, { useState }      from 'react'
import Carousel                 from 'components/Carousel'

const Gallery = ({ photos, closeCarousel, isCarouselOpen, selected }) => {
  const [pickedPhotoIndex, assignPhotoIndex] = useState(selected);

  const onNextClick = () => {
    assignPhotoIndex(pickedPhotoIndex >= photos.length - 1 ? 1 : pickedPhotoIndex + 1)
  };
  const onPrevClick = () => {assignPhotoIndex(pickedPhotoIndex - 1)}

  return (
    <Carousel
      selected={pickedPhotoIndex}
      isOpen={isCarouselOpen}
      closeCarousel={closeCarousel}
      photos={photos}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
      assignPhotoIndex={assignPhotoIndex}
    />
  )
};

export default Gallery