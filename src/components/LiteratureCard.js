import React              from 'react'
import styled             from 'styled-components'

import media              from 'styledComponents/media'
import {
  LiteratureParagraph,
  LiteratureTitle
}                         from 'styledComponents'

import { literature }     from 'lang'

const StyledImage = styled.img`
  width: 100%;
  ${media.mobile`
    width: 300px;
  `};
  height: auto;
`;

const ImageWrapper = styled.div`
  margin-top:5px;
`;

const StyledDiv = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  &:not(:last-of-type){
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid #a4a4a4;
  };

  ${media.full`
    margin-right: 20px;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid #a4a4a4;
  `};
  
  max-width: 700px;
  ${media.mobile`
    flex-direction: row;
  `}
`;

const TextWrapper = styled.div`
  position: static;
  width: 280px;
  ${media.mobile`
    margin-left: 20px;
  `}
`;

const LiteratureCard = ({ title, sizes, editors, texts, designers, lang}) => {
  return (
    <StyledDiv>
      <ImageWrapper><StyledImage src={sizes.med} /></ImageWrapper>
      <TextWrapper>
        <LiteratureTitle>{title}</LiteratureTitle>
        <LiteratureParagraph grey>{literature[lang].texts}</LiteratureParagraph>
        <LiteratureParagraph dangerouslySetInnerHTML={{__html: texts}} />
        <LiteratureParagraph grey>{literature[lang].design}</LiteratureParagraph>
        <LiteratureParagraph dangerouslySetInnerHTML={{__html: designers}} />
        <LiteratureParagraph grey>{literature[lang].editors}</LiteratureParagraph>
        <LiteratureParagraph dangerouslySetInnerHTML={{__html: editors}} />
      </TextWrapper>
    </StyledDiv>
  )
};

export default LiteratureCard
