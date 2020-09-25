import React    from 'react'
import styled   from 'styled-components'

import media    from 'styledComponents/media'

const StyledImage = styled.img`
  width: 100%;
  ${media.tablet`
    width: 40vw;
  `}
`

const StyledTitle = styled.h2`
  font-weight: 600;
  color: #333d47;
  letter-spacing: 0.1em;
  font-size: 18px;
  line-height: 1.5;
  ${props => props.bigTitle && `
    font-size: 28px;
    max-width: 50%;
    line-height: 1.2;
    margin-bottom: 17px;
  `}
  
`

const CityAndDate = styled.p`
  font-weight: 600;
  color: ${props => props.bigTitle ? "#a3a9ac" : "#e11282"};
  letter-spacing: 0.1em;
  font-size: ${props => props.bigTitle ? "15px" : "14px"};
`

const Description = styled(CityAndDate)`
  margin-top: 10px;
  color: #5A5857;
  font-weight: 500;
  font-size: 17px;
  ${props => props.bigTitle && `
    text-transform: none;
    letter-spacing: 0;
    margin-top: 20px;
    font-weight: 300;
  `}

  p{
    margin: 10px 0;
  }
`

const StyledDiv = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  &:not(:last-of-type){
    
    border-bottom: 1px solid #5A5857;;
    padding-bottom: 30px;
  }
  ${media.tablet`
    flex-direction: row;
  `}
`

const TextWrapper = styled.div`
  position: static;
  text-transform: uppercase;
  top: 100%;
  width: 100%;
  margin-left: 0;
  margin-bottom: 30px
  margin-top: -5px;
  ${media.tablet`
    margin-left: 30px;
    margin-bottom: 0;
  `};
`

const MainCard = ({ name, labelPhoto, place, city, date, description, horizontal, bigTitle}) => {
  return (
    <StyledDiv horizontal={horizontal}>
      <div><StyledImage src={labelPhoto} name={name} /></div>
      <TextWrapper>
        <StyledTitle bigTitle={bigTitle}>{place}</StyledTitle>
        <CityAndDate bigTitle={bigTitle}>{city} / {date}</CityAndDate>
        <Description bigTitle={bigTitle} dangerouslySetInnerHTML={{__html: description}} />
      </TextWrapper>
    </StyledDiv>
  )
};

export default MainCard
