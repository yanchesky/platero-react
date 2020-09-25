import React              from "react"
import styled             from "styled-components";
import { connect }        from 'react-redux'
import { Link }           from "react-router-dom";

import {
  CookiesTab,
  AgreeButton
}                         from "styledComponents"
import { Paragraph }      from "styledComponents/typo"

import media              from "../styledComponents/media";
import closeButton        from "../assets/close-button.svg";

const ButtonsWrapper = styled.div`
  margin: 20px;
  ${media.mobile`
    margin: 0 20px;
  `};
  min-width: 150px;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.img`
  align-self: flex-start;
  display: none;
  ${media.mobile`
    display: block;
  `}
`

const CooksTab = ({ cookiesAccepted, dispatch }) => {
  const acceptCookies = () => {
    dispatch('cookiesAccepted', true);
    window.localStorage.setItem("cookiesAccepted", 1)
  };

  if(cookiesAccepted) return null;
  return (
  <CookiesTab onClick={acceptCookies}>
    <div>
      <Paragraph>We use cookies to offer you a better browsing
        experience and analyze site traffic. Read how we use cookies
        and how you can controll them in our</Paragraph>
      <Link to="/cookies-policy"><Paragraph bold>"Privacy Policy"</Paragraph></Link>
    </div>
    <ButtonsWrapper>
      <AgreeButton>I agree</AgreeButton>
      <CloseButton src={closeButton} />
    </ButtonsWrapper>
  </CookiesTab>
)};

export default connect(
  ({ cookiesAccepted }) => ({ cookiesAccepted }),
  dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })})
)(CooksTab)