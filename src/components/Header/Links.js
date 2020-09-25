import React                           from 'react'
import styled                          from 'styled-components'

import RolloverWrapper                 from './RolloverWrapper'
import HamburgerMenu                   from './HamburgerMenu'

import { pickRouteFromArray }          from 'helpers';
import {
  HorizontalLinksWrapper,
  StyledLink
}                                      from 'styledComponents'

const MainWrapper = styled.div`
  width: 100%;
  margin: 2px auto;
`;

const renderInnerLinks = (link) => {
  return (
    <RolloverWrapper topElement={link}>
      {link.inner
        .map(innerLink =>
          <StyledLink
            activeClassName="active-link"
            to={`${link.path}${innerLink.path}`}
          >
            {innerLink.label}
          </StyledLink>)
      }
    </RolloverWrapper>
  )
};

const Links = (props) => {
  return (
    <MainWrapper>
      <HorizontalLinksWrapper>
        {
          props.translatedLinks.map((link, index) => {
            if(link.inner) return renderInnerLinks(link);

            return (
              <StyledLink
                key={index}
                onClick={() => {window.scrollTo(0,0)}}
                activeClassName="active-link"
                to={pickRouteFromArray(link.path)}
              >
                {link.label}
              </StyledLink>
            )
          })
        }
      </HorizontalLinksWrapper>
      <HamburgerMenu changeLanguage={props.changeLanguage} links={props.translatedLinks} />
    </MainWrapper>
  )
};

export default Links