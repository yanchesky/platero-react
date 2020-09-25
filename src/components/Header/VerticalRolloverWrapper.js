import React, { useState } from 'react'
import styled from 'styled-components'

import arrow from 'assets/icon-dropdown-arrow.png'
import arrow2x from 'assets/icon-dropdown-arrow@2x.png'

const LinksWrapper = styled.div`
  position: relative;
  display: block;
  background: rgba(150, 150, 150, 0.5);
  overflow: hidden;
  max-height: ${props => props.isRevealed ? props.heightToResize + "px" : "0"};
  transition: max-height 0.25s ease-in;
`;

const LinkTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  :hover span, :hover a, :hover{
    background: #eee;
  }
`;

const MainWrapper = styled.div`
  z-index: 1;
  background: white;
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  transform: rotate(${props => props.isRevealed ? "180deg" : "0deg"});
  transition: 0.25s transform ease-in;
`;

const StyledUnorderedList = styled.ul`
  padding: 0 20px;
  background: white;
`;

const RolloverWrapper = ({ children, linkHeight }) => {
  const [isRevealed, reveal] = useState(false);
  if(!children) return null;

  return (
    <MainWrapper>
      <LinkTitleWrapper onClick={() => reveal(!isRevealed)}>
        <div>{children[0]}</div>
        <ArrowWrapper isRevealed={isRevealed}><img alt="open" src={arrow} srcSet={`${arrow2x} 2x`} /></ArrowWrapper>
      </LinkTitleWrapper>
      <LinksWrapper isRevealed={isRevealed} heightToResize={linkHeight * (children.length - 1)}>
        <StyledUnorderedList>
          {children.slice(1).map((el, index) => <li key={index}>{el}</li>)}
        </StyledUnorderedList>
      </LinksWrapper>
    </MainWrapper>
    
  );
};

export default RolloverWrapper