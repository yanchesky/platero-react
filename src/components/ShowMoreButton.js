import React                    from 'react'
import styled                   from 'styled-components'
import { NavLink }              from 'react-router-dom'

import media                    from 'styledComponents/media'

import { pickRouteFromArray }   from 'helpers'
import rightArrow               from 'assets/keyboard_arrow_right-24px.svg'

const Paragraph = styled(NavLink)`
  font-family: 'Barlow', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  z-index: 1;
  display: ${props => props.categoriescount > 4 ? "block" : "none"};
  ${media.desktop`
    display: ${props => props.categoriescount > 6 ? "block" : "none"}
  `}
  
  
  :after{
    position: relative;
    top: 6px;
    content: url(${rightArrow});
    transition: margin-left .1s ease-in-out;
  }
  :hover{
    :after{
      margin-left: 5px;
    }
  }
`;

const ShowMoreButton = ({ link, children, categoriesCount }) => {
  return (
    <>
      <Paragraph
        categoriescount={categoriesCount}
        onClick={() => window.scrollTo(0,0)}
        to={pickRouteFromArray(link)}
      >
        {children}
      </Paragraph>
    </>
  )
};

export default ShowMoreButton
