import React, { Component }            from 'react'
import styled                          from 'styled-components'
import { Link, NavLink }               from 'react-router-dom'
import { connect }                     from "react-redux";

import media                           from 'styledComponents/media'

import VerticalRolloverWrapper         from './VerticalRolloverWrapper'
import Hamburger                       from './Hamburger'

import {
  redirectTo,
  pickRouteFromArray
}                                      from 'helpers'

const LINK_HEIGHT = 60;

const StyledLink = styled(Link)`
  display: block;
  color: #222;
  text-decoration: none;
  font-weight: 100;
  padding: 15px 20px;
  ${media.mobile`
    padding: 15px 30px;
  `};
  background: white;
 
  :hover{
    background: #eee;
  }
 
  ${media.desktop`
    margin: 0 30px;
    font-size: 16px;
  `};
`;

const LanguageLinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

`

const StyledSpan = styled.span`
  display: block;
  color: #222;
  text-decoration: none;
  font-weight: 100;
  padding: 15px 30px;
  background: white;
 
  :hover{
    background: #eee;
  }
 
  ${media.desktop`
    margin: 0 30px;
    font-size: 16px;
  `}
`;

const LanguageElement = styled(NavLink)`
  display: block;
  color: #222;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px;
  background: white;
  width: 50%;
  text-align: center;
  font-weight: ${props => props.selected ? 'normal' : 100};
 
  :hover{
    background: #eee;
  }
 
  ${media.desktop`
    margin: 0 30px;
    font-size: 16px;
  `}
`

const MainWrapper = styled.div`
  width: 100%;
  z-index: 10;
`

const HamburgerMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  /* transform: translateX(-40px); */
`;

const HamburgerLinksContainer = styled.div`
  font-size: 24px;
  width: 100vw;
  height: ${props => props.containerHeight && props.containerHeight + "px"};
  overflow: auto;
  position: fixed;
  background: white;
  top: 90px;
  left: 0;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: 0.4s all ease-out;
  clip-path: ${props => props.isOpen ? 
    `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
  : 
    "polygon(0 0, 100% 0, 100% 0, 0 0)"};

  max-height: ${props => props.isOpen ? window.innerHeight - 90 + "px" : 0};

  margin-bottom: 50px;

  > ${StyledLink}{border-bottom: solid 1px #ddd;}
  > div {border-bottom: solid 1px #ddd;}
`;

const languages = [
  {
    short: 'en'
  },
  {
    short: 'es'
  }
];

class HamburgerMenu extends Component {
  state = {
    mobileMenuIsOpen: false
  };

  componentDidMount() {
    window.addEventListener("resize", this.onHigherWidth);
  }

  openMobileMenu = (bool) => {
    this.setState({mobileMenuIsOpen: bool});
    this.props.dispatch({ overflowIsHidden: bool })
  };
  toggleMobileMenu = () => this.openMobileMenu(!this.state.mobileMenuIsOpen);

  onHigherWidth = () => {
    if(this.state.mobileMenuIsOpen && window.innerWidth > 680){
      this.openMobileMenu(false);
      window.removeEventListener("resize", this.onHigherWidth);
    }
  };

  renderInnerLinks = (link, index) => {
    return (
      <VerticalRolloverWrapper key={index} linkHeight={LINK_HEIGHT}>{
        [
          <StyledSpan>{link.label}</StyledSpan>,
          ...link?.inner?.map((innerElement, index) =>
            <StyledLink
              key={index}
              //onClick={this.toggleMobileMenu}
              to={`${link.path}${innerElement.path}`}
            >
              {innerElement.label}
            </StyledLink>
          )
        ]
      }
      </VerticalRolloverWrapper>
    )
  };

  render(){
    const { links, lang, changeLanguage } = this.props;
    const { mobileMenuIsOpen } = this.state;
    
    return (
      <MainWrapper>
        <HamburgerMenuWrapper>
          <Hamburger
            isOpened={mobileMenuIsOpen}
            toggleMenu={this.toggleMobileMenu}
          />
          <HamburgerLinksContainer isOpen={mobileMenuIsOpen} containerHeight={mobileMenuIsOpen ? LINK_HEIGHT * 9 : LINK_HEIGHT * 7}>
            {links.map((link, index) => {
              if(link.inner) return this.renderInnerLinks(link);

              return (
                <StyledLink
                  key={index}
                  onClick={this.toggleMobileMenu}
                  to={pickRouteFromArray(link.path)}
                >
                  {link.label}
                </StyledLink>
              )
            })}
            <LanguageLinkWrapper>
              {
                languages.map(({ short }) => (
                  <LanguageElement
                    isActive={() => lang === short}
                    onClick={() => {changeLanguage(short)}}
                    to={redirectTo(lang, short)}
                  >{short}</LanguageElement>
                ))
              }
            </LanguageLinkWrapper>
          </HamburgerLinksContainer>
        </HamburgerMenuWrapper>
      </MainWrapper>
    )
  }
}

export default connect(
  ({ overflowIsHidden, lang }) => ({ overflowIsHidden, lang }),
  dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })})
)(HamburgerMenu);