import React, {useState }     from 'react';
import { connect }            from 'react-redux'
import styled                 from "styled-components";

import media                  from "../styledComponents/media";
import arrow2                 from "../assets/Arrow_1.svg";

const Slide = styled.div`
  position: ${props => props.stickToBottom ? 'relative' : 'relative'}; //was static
  color: #222;
  background: white;
  min-width: 270px;
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledImage = styled.img`
  max-width: calc(100vw - 40px);
  max-height: ${props => props.viewport.height && props.viewport.height - 40 + "px"};
  ${media.mobile`
    max-width: calc(100vw - 60px);
    max-height: ${props => props.viewport.height && props.viewport.height - 60 + "px"};
  `}
`

const PaintingDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  background: white;
  opacity: 1;
  bottom: 20px;
  width: calc(100vw - 40px);
  margin: 0 auto;
  padding: 30px 5px 40px;
  ${media.mobile`
    padding: 15px 40px;
    width: calc(100vw - 60px);
  `};
  font-size: 18px;
  font-weight: 300;
  transform: translateY(${props => props.isDescriptionOpen ? '0' : '100%'});
  transition: transform 0.4s cubic-bezier(${props => props.isDescriptionOpen ? '0,.89,.18,1' : '.54,0,1,.42'});
  &:before{
    content: "";
    top: 75px;
    position: absolute;
    width: 100vw;
    height: 100px;
    background: white;
  }

  @media (orientation: landscape) and (max-width: 700px){
    display: none;
  }
`;

const NavButton = styled.div`
  justify-content: center;
  width: 60px;
  height: 60px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  ${props => props.left && 'transform: rotate(180deg)'};
  display: none;
  background: white;
  ${media.mobile`
    display: flex;
  `};
`;

const Properties = styled.div`
  width: 100%;
  ${media.mobile`
    width: calc(100% - 100px);
    margin: 0 20px;
  `}
  text-align: left;
  font-size: 15px;
`

const Description = styled.span`
  position: relative;
  font-family: 'Barlow', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-align: left;
  margin: 5px 0;
  font-weight: ${props => props.bold ? 600 : 500};
  color: ${props => props.grey ? "#a6a9a8": "#393c44"};
  :after{
    ${props => props.line && `
      content: "";
      position: absolute;
      width: 200px;
      top: -7px;
      left: 0;
      border-top: 2px solid #a6a9a8;
    `}
  };
`;

const ArrowIcon = styled.img`
  opacity: ${props => props.disabled ? 0.3 : 1};
`;

const CarouselSlide = ({element, lang, viewport, onNextClick, onPrevClick, stickToBottom }) => {
  const [isDescriptionOpen, setDescriptionState] = useState(true);

  return (
    <Slide stickToBottom={stickToBottom}>
      <div>
        <StyledImage
          onClick={() => setDescriptionState(!isDescriptionOpen)}
          viewport={viewport}
          src={element.src}
        />
      </div>
      <PaintingDescriptionContainer isDescriptionOpen={isDescriptionOpen}>
        <NavButton left onClick={onPrevClick}><ArrowIcon src={arrow2} /></NavButton>
        <Properties>
          <Description bold line>{element.title[lang]}</Description>
          <Description bold grey>
            ,&nbsp;{element.year} {element.technique[lang]} - {element.basePanel[lang]}
            ({element.infoWidth} x {element.infoHeight} cm)
          </Description>
        </Properties>
        <NavButton onClick={onNextClick}><ArrowIcon src={arrow2} /></NavButton>
      </PaintingDescriptionContainer>
    </Slide>
  );
};

export default connect(({ lang }) => ({ lang }), null)(CarouselSlide);