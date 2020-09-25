import React, { useState }      from 'react'
import styled                   from 'styled-components'
import AwesomeSlider            from 'react-awesome-slider'

import media                    from 'styledComponents/media'
import CarouselSlide            from './CarouselSlide'

import closeButton              from 'assets/close-button.svg'
import                          'react-awesome-slider/dist/styles.css';

const CloseButton = styled.div`
  font-size: 40px;
  color: #A4A9AD;
  text-align: center;
  position: absolute;
  right: -30px;
  top: -40px;
  z-index: 2;
  width: 45px;
  height: 45px;
  cursor: pointer;
  transform: translateX(-20px) scale(.8);
  :hover{
    color: #666;
  }
`;

const SliderContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 20px;
  width: calc(100vw - 40px);
  height: ${props => props.viewport.height && props.viewport.height - 40 + "px"};
  
  &:after{
  content: "";
  top: -80px;
  left: -20px;
  width: 100vw;
  height: 100px;
  background: white;
  position: absolute;
  }

  ${media.mobile`
    left: 30px;
    width: calc(100vw - 60px);
    height: ${props => props.viewport.height && props.viewport.height - 60 + "px"}
  `};
  /* overflow: ${props => props.isOpen ? "hidden" : "visible"}; */
  
  z-index: 3;
`;

const getDimensions = () => ({
    height: window.innerHeight,
    width: window.innerWidth
  })



const Carousel = ({ isOpen, closeCarousel, selected, photos, onNextClick, onPrevClick }) => {
  const [viewportDimension, setViewportDimension] = useState(getDimensions());

  function resizer(){
    window.removeEventListener("resize", resizer)
    setTimeout(() => {
      setViewportDimension(getDimensions())
    }, 300)
  }

  window.addEventListener("resize", resizer);

  const checkScreenRatio = imageRatio => {
    const viewportRatio = viewportDimension.width / viewportDimension.height
    return (viewportRatio / imageRatio) < 1
  };

  if(!isOpen) return null;

  return (
      <SliderContainer viewport={viewportDimension} isOpen={isOpen}>
        <AwesomeSlider organicArrows={false} infinite={true} selected={selected} fillParent bullets={false}>
          {
            photos.map((photo, index) =>
              <>
                <CarouselSlide
                  key={index}
                  element={photo}
                  viewport={viewportDimension}
                  onNextClick={onNextClick}
                  onPrevClick={onPrevClick}
                  stickToBottom={checkScreenRatio(photo.width / photo.height)}
                />
              </>
            )
          }
        </AwesomeSlider>
        <CloseButton onClick={closeCarousel}><img alt="close" src={closeButton} /></CloseButton>
      </SliderContainer>
  )};

export default Carousel
