import styled, { createGlobalStyle }            from 'styled-components'
import { NavLink }                              from 'react-router-dom'

import media                                    from './media'

export const GlobalStyle = createGlobalStyle`
  body{
    position: relative;
    font-family: 'Barlow', sans-serif;
    color: #5A5857;
    overflow-x: hidden;    
  }

  *,*:after,*:before{
    padding: 0;
    margin: 0;
  }

  input{
    font-family: 'Roboto', sans-serif;
  }

  li{
    list-style-type: none;
  }

  a.active-link, a.active{
    font-weight: bold;
    color: #333d47;
    z-index: 1;
  }
  
  a{
    text-decoration: none;
    color: inherit;
  }

  .awssld__next{
    visibility: hidden;
  }
  .awssld__prev{
    visibility: hidden;
  }
  .awssld__content{
    overflow: visible !important;
  }
  
  .MuiCircularProgress-circle{
     color: #d9d9d9
  }
`;

export const HorizontalLinksWrapper = styled.div`
  display: none;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  padding: 0 10px;
  font-size: 14px;

  ${media[1056]`
    display: flex;
    justify-items: flex-start;
  `}
  
  ${media.desktop`
    padding: 0 15px;
  `}
`;

export const StyledLink = styled(NavLink)`
  font-family: 'Barlow', sans-serif;
  text-transform: uppercase;
  display: block;
  letter-spacing: 0.1em;
  color: #a6a9a8;
  text-decoration: none;
  font-weight: 400;
  margin: 0 10px;
  
  :not(:last-of-type){
    :after{
        position: relative;
        content: "|";
        left: 10px;
        font-weight: normal;
      }
  }
`;

export const AgreeButton = styled.span`
  cursor: pointer;
  border: 1px solid #a3a9ac;
  border-radius: 5px;
  text-transform: uppercase;
  padding: 5px 15px;
  font-size: 12px;
  letter-spacing: 0.1em;
  margin-right: 20px;
`;

export const CookiesTab = styled.div`
  position: fixed;
  width: calc(100vw - 40px);
  padding: 20px 0;
  margin: 0 20px;
  height: 110px;
  top: calc(100vh - 160px);
  ${media.mobile`
    height: 75px;
    top: calc(100vh - 100px);
    display: flex;
    justify-content: flex-end;
    margin: 0 30px;
  `};
  background: white;
  left: 0;
  z-index: 2;
`;

export const Paragraph = styled.p`
  font-family: 'Barlow', sans-serif;
  text-transform: uppercase;
  font-weight: 600;

`;

export const FooterParagraph = styled(Paragraph)`
  font-size: ${props => props.head ? "17px" : "15px"};
  color: ${props => props.head ? "#363b3e" : "#7f8689"};
  letter-spacing: ${props => props.head ? "0.2em" : "0.1em"};
  ${props => props.head && "margin-bottom: 3px"};
  ${props => props.hoverable && `
    &:hover{
      text-decoration: underline;
    }
  `}
`;

export const LiteratureParagraph = styled.p`
  font-family: 'Barlow', sans-serif;
  color: ${props => props.grey ? "#a4a5a7" : "#2c3638"};
  ${props => props.grey && "margin-top: 20px"};
  line-height: 1;
`;

export const LiteratureTitle = styled(Paragraph)`
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #373b3e;
`;

export const CommingSoon = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 300;
  letter-spacing: 0.1em;
  padding: 150px 0;
`;
