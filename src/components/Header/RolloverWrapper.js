import React, { useState }    from 'react'
import styled                 from 'styled-components'

import { StyledLink }         from 'styledComponents'

const LinksWrapper = styled.div`
  position: absolute;
  background: rgba(255,255,255,.7);
  display: ${props => props.isRevealed ? "block" : "none"};
  text-align: left;
`;

const MainWrapper = styled.div`
  z-index: 1;
`;

const StyledElement = styled.li`
  margin: 10px 0;
`;

const RolloverWrapper = ({ children, topElement }) => {
  const [isRevealed, reveal] = useState(false)
  if(!children) return null;

  return (
    <MainWrapper onMouseLeave={() => reveal(false)}>
      <span onMouseOver={() => reveal(true)}>
        <StyledLink to={topElement.notClickable ? "#" : topElement.path}>
          {topElement.label}
        </StyledLink>
      </span>
      <LinksWrapper isRevealed={isRevealed} >
        <ol>
          {children.map((el, index) => <StyledElement key={index}>{el}</StyledElement>)}
        </ol>
      </LinksWrapper>
    </MainWrapper>
  );
};

export default RolloverWrapper