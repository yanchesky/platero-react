import React                      from 'react'
import styled                     from 'styled-components'
import { Link, NavLink }          from 'react-router-dom'
import { connect }                from 'react-redux'

import Links                      from './Links'

import media                      from 'styledComponents/media'
import logo                       from 'assets/Platero_Logo.svg'
import {
  isEmpty,
  translateLinks,
  redirectTo,
  headerStateToProps,
  dispatcher
}                                 from "helpers";

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
  justify-content: space-between;
  background: white;
  z-index: 2;
  padding: 10px 20px 20px;
  ${media.mobile`
    padding: 10px 30px 20px 30px;
  `};
  max-width: 1200px;
  margin: 0 auto;
`;

const HorizontalLinks = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Languages = styled.div`
  cursor: pointer;
  display: none;
  text-align: right;
  font-size: 14px;
  line-height: 1.6;
  max-width: 70px;
  ${media[1056]`
    display: flex;
  `}

   :hover{
     > a{
      transform: translateX(-${props => (props.size - 1) * 70}px);
      max-width:140px;
     }
  }
`;

const LanguageElement = styled(NavLink)`
  padding: 0 5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: white;
  ${props => props.transformlength && `
    transform: translateX(${props.transformlength});
  `};
  transition: transform .2s ease-in-out;
`;

const languages = [
  {
    short: 'en',
    long: "english"
  },
  {
    short: 'es',
    long: 'spanish'
  }
];

const Header = ({ translatedLinks, isLightboxOpen, lang, dispatch }) => {

  const changeLanguage = (lang) => {
    const newLinks = translateLinks(lang);
    dispatch({ lang, translatedLinks: newLinks });
    localStorage.setItem('lang', lang);
  };

  if(isEmpty(translatedLinks) || isLightboxOpen) return null;
  return (
    <MainWrapper>
      <div><Link to="/" onClick={() => window.scroll(0,0)}><img alt="logo" src={logo} width="150px" /></Link></div>
      <HorizontalLinks>
        <Links lang={lang} changeLanguage={changeLanguage} translatedLinks={translatedLinks} />
      </HorizontalLinks>
      <Languages size={languages.length}>
        {languages.map(({ short, long }, index) => (
          <LanguageElement
            key={index}
            isActive={() => lang === short}
            onClick={() => {changeLanguage(short)}}
            transformlength={`-${index * 70}px`}
            to={redirectTo(lang, short)}
          >{long}</LanguageElement>
        ))}
      </Languages>
    </MainWrapper>
  )
};

export default connect(headerStateToProps, dispatcher)(Header);