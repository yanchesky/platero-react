import React      from 'react'
import styled     from 'styled-components'

import Heading    from 'components/Heading'

import media      from 'styledComponents/media'

const Wrapper = styled.div`
  margin: 50px 10px;
  ${media.mobile`
    margin: 50px 30px;
  `}
  font-weight: 300;
  ${media.tablet`
    display: flex;
    justify-content: space-between;
  `}
`;

const StyledHeader = styled.h2`
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  max-width: 350px;
  margin-right: 40px;
`;

const ContactWrapper = styled.div`
  
  
  ${media.smallest`
    display: flex;
    justify-content: space-between;
  `}

  ${media.tablet`
    margin-top: 5px;
  `}
`;

const ContactElement = styled.div`
  margin-bottom: 15px;
  h4{
    font-size: 18px;
    margin-bottom: 4px;
  }
  p{
    font-size: 15px;
  }
`;

const ContactColumn = styled.div`
 ${media.tablet`
    display: flex;
    flex-direction: column-reverse;
  `}
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

const TextWrapper = styled.div`
  margin-top: 40px;
`;

const Contact = () => (
  <>
    <Heading>Contact</Heading>
    <Wrapper>
      <InputWrapper>
        <StyledHeader>Get to know Platero better!</StyledHeader>
        <ContactWrapper>
          <ContactColumn>
            <TextWrapper>
              <ContactElement>
                <h4>Workshop</h4>
                <p>ul. Dzielna 7</p>
                <p>00-154 Warszawa</p>
                <p>Polska</p>
              </ContactElement>
              <ContactElement>
                <h4>Web</h4>
                <p>www.platero.eu</p>
              </ContactElement>
              <ContactElement>
                <h4>E-mail</h4>
                <p>info@platero.eu</p>
              </ContactElement>
            </TextWrapper>
          </ContactColumn>
        </ContactWrapper>
      </InputWrapper>
      <div>
        <StyledImage src="photos/platero-map.jpg" />
      </div>
    </Wrapper>
  </>
);

export default Contact