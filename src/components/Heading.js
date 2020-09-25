import React            from 'react'
import styled           from 'styled-components'

import media            from 'styledComponents/media'

const Wrapper = styled.div`
  width: 100%;
  text-align: ${props => props.home ? "left" : "center"};
  margin: 20px 0 50px;
`;

const Border = styled.div`
  width: 100%;
  border-bottom: 1px solid #a6a9a8;
  margin: 0 auto 40px;
  ${media.smallest`
    min-width: 430px;
    width: 50%;
  `}
`;

const Head = styled.h2`
  font-family: 'Barlow', sans-serif;
  text-transform: uppercase;
  color: #7c858c;
  letter-spacing: 0.2em;
  line-height: 1.5;
  font-size: 26px;
  ${media.mobile`
    font-size: 36px;
  `};
  font-weight: 300;
  margin: ${props => props.margin ? props.margin : "0 0 5px"};

  :after{
    content:"-";
  }
  :before{
    content: "-";
  }
`;

const Heading = ({children, margin, home, centered}) => {
  return (
    <Wrapper home={home && !centered}>
      <Head margin={margin}>{children}</Head>
      {!home && <Border />}
    </Wrapper>
  )
};

export default Heading
