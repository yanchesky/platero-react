import React      from "react";
import styled     from "styled-components";

import media      from "styledComponents/media";

const NavButton = styled.div`
  border: 0;
  height: 40px;
  width: 40px;
  margin-left: 20px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  z-index: 999;

  strong {
    position: absolute;
    left: -999px;
  }
  span {
    display: block;
    background-color: #000;
    width: 30px;
    height: 3px;
    margin: 2px;
    transform: rotate(0) translate(0, 0);
  }

  span:nth-of-type(1) {
    transform: rotate(${props => props.isOpened ? "45deg" : "0"})
      translate(${props => props.isOpened ? "5px, 5px" : "0"});
    transition: 0.4s all ease-out;
  }

  span:nth-of-type(2) {
    transform: scaleX(${props => props.isOpened ? "0" : "1"});
    transition: 0.4s all  ease-out;
  }

  span:nth-of-type(3) {
    transform: rotate(${props => props.isOpened ? "-45deg" : "0"})
      translate(${props => props.isOpened ? "5px, -5px" : "0"});
    transition: 0.4s all ease-out;
  }

  ${media[1056]`
    display: none;
  `}
`;

const NavToggle = ({ isOpened, toggleMenu }) => {
  
  return (
    <>
      <NavButton isOpened={isOpened} onClick={toggleMenu} >
        <strong>Menu</strong>
        <span />
        <span />
        <span />
      </NavButton>
    </>
  );
};

export default NavToggle;
