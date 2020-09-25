import React          from 'react'
import styled         from 'styled-components'

import { misc }       from 'lang';

const StyledTitle = styled.h2`
  margin-top: 10px;
  font-weight: 600;
  color: #333d47;
  letter-spacing: 0.1em;
  font-size: 18px;
  line-height: 1.5;
  ${props => props.isNews && 'line-height: 1.2'};
  text-align: ${props => props.centered ? "center" : "left"};
`

const CityAndDate = styled.p`
  font-weight: 600;
  color: #e11282;
  letter-spacing: 0.1em;
  font-size: 14px;
  ${props => props.isNews && 'margin-top: 10px'};

`

const Description = styled(CityAndDate)`
  margin-top: 10px;
  color: #a3a9ac;
  font-weight: 500;
  p:not(:first-of-type){
    display: none;
  }
`

const StyledDiv = styled.div`
  z-index: 1;
  display: ${props => props.horizontal ? 'flex' : 'block'};
`

const TextWrapper = styled.div`
  position: static;
  text-transform: uppercase;
  top: 100%;
  width: 100%;
  ${props => props.isVideo && "margin-bottom: 50px"};
`

const ImageTitle = styled.p`
  color: #333d47;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 15px;
`

const CardContainer = styled.div`
  font-family: 'Barlow', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-bottom: ${props => props.exhibition ? "125%" : "67%"};
  background-repeat: no-repeat;
  background-image: url(${props => props.labelPhoto}); 
  background-size: cover;
  background-position: center;
  z-index: 1;

  :after{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: black;
    opacity: 0;
    transition: opacity .2s ease-in-out;
  }

  :before{
    max-width: 70%;
    position: absolute;
    /* content: "${props => props.name}"; */
    z-index: 1;
    opacity: 0;
    transition: all .2s ease-in-out;
    color: white;
    font-size: 30px;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%);
  }

  :hover{
    :after{
      content: "";
      opacity: .3;
    }
    :before{
      opacity: 1;
    }
  }
`

const MainCard = ({ name, labelPhoto, place, city, date, description, horizontal, trimDescription, lang, exhibition, isVideo, isWork, home}) => {
  const isExhibition = !!place && !!city;
  const isNews = !!place && !city;
  
  return (
    <StyledDiv horizontal={horizontal}>
      <CardContainer exhibition={exhibition} labelPhoto={labelPhoto} name={name}>
        
      </CardContainer>
      {
        isVideo &&
          <TextWrapper isVideo={isVideo && home}>
            <StyledTitle centered>{name}</StyledTitle>
            <Description dangerouslySetInnerHTML={{__html: description}} />
            {trimDescription && <span>{misc.readMore[lang]}</span>}
          </TextWrapper>
      }
      {isExhibition &&
        <TextWrapper>
          <StyledTitle>{place}</StyledTitle>
          <CityAndDate>{city} / {date}</CityAndDate>
          <Description dangerouslySetInnerHTML={{__html: description}} />
          {trimDescription && <span>{misc.readMore[lang]}</span>}
        </TextWrapper>
      }
      {isNews &&
        <TextWrapper>
          <StyledTitle isNews>{place}</StyledTitle>
          <CityAndDate isNews>{date}</CityAndDate>
          <Description dangerouslySetInnerHTML={{__html: description}} />
          {trimDescription && <span>{misc.readMore[lang]}</span>}
        </TextWrapper>
      }
      {isWork &&
        <TextWrapper>
          <ImageTitle>{name}</ImageTitle>
        </TextWrapper>
      }
    </StyledDiv>
  )
};

export default MainCard
