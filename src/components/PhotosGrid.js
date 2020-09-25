import React  from 'react'
import styled from 'styled-components'

import media from 'styledComponents/media'

const Wrapper = styled.div`
  display: inline-grid;
  width: 100%;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  ${media.mobile`
    grid-template-columns: 1fr 1fr;
  `}
  ${media.tablet`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  ${media.desktop`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: calc(67%);
  overflow: hidden;
  cursor: pointer;

  :after{
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${props => props.src});
    background-size: cover;
    background-position: center;
    transition: transform .1s ease-out;
  }

  :hover{
    :after{
      transform: scale(1);
    }
  }
`;

const PhotosGrid = ({ photos, onOpen, specificWork }) => {
  return (
    <Wrapper>
      {photos.map((el, index) =>
        <ImageWrapper
          key={index}
          specificWork={specificWork}
          onClick={() => onOpen(index)}
          src={el.thumbnail}
        />
      )}
    </Wrapper>
  )
};

export default PhotosGrid
