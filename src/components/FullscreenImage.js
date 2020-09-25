import React            from 'react'
import styled           from 'styled-components'

import media            from 'styledComponents/media'
import arrowDown        from 'assets/arrow_down.svg'
import { withRouter }   from 'react-router-dom'

const Spacer500 = styled.div`
  height: calc(100vh - 95px);
  position: relative;
  overflow: hidden;
`

const ArrowWrapper = styled.div`
  position: absolute;
  top: 100vh;
  left: 50%;
  transform: translateX(-50%) translateY(-70px);
  opacity: ${props => props.opacity};
  cursor: pointer;
  z-index: 1;
`

const BottomImageCutter = styled.div`
  position: relative;
  &:after{
    content: "";
    position: absolute;
    width: calc(100vw - 20px);
    max-width: 1200px;
    height: calc(100vh - 90px);
    left: 0;
    z-index: 1;
    outline: 15px solid white;
  }

  &:before{
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 15px;
    z-index: 2;
    background: red;
  }
`



const StyledImage = styled.img`
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
  ${media.tablet`
    display: none;
  `}
`

const FullscreenImageWrapper = styled.div`
  width: calc(100vw - 20px);
  height: calc(100vh - 90px);
  position: absolute;
  left: 0;
  max-width: 1200px;
  
  ${media.tablet`
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-image: url("photos/dachy.jpeg"); 
    background-size: cover;
    background-position: center;
  `}
`

const FullscreenImage = () => {
    return (
      <>
        <BottomImageCutter><FullscreenImageWrapper id="fullscreen-image" /></BottomImageCutter>
          <ArrowWrapper onClick={() => window.scrollTo({top: window.innerHeight - 40, behavior: 'smooth'})} >
            <img alt="arrow" id="fullscreen-arrow" src={arrowDown} />
          </ArrowWrapper>
        <Spacer500>
          <StyledImage id="fullscreen-image" src="photos/dachy.jpeg" />
        </Spacer500>
      </>
    )
};

export default withRouter(FullscreenImage)
