import React                from 'react'
import styled               from 'styled-components'
import { connect }          from 'react-redux';
import { Link }             from "react-router-dom";

import media                from 'styledComponents/media'
import { FooterParagraph }  from 'styledComponents'

import { misc }             from 'lang'
import iconIn               from "../assets/Icon_Insta-01.svg"

const Wrapper = styled.div`
  width: 100%;
  min-height: 130px;
  background: #d9d9d9;

  ${media.tablet`
    display: inline-grid;
    grid-template-columns: .5fr .5fr 1fr;
  `};
  
  padding: 20px 0;
`;

const FooterElement = styled.div`
  
  /* margin: 30px 20px 10px; */
  padding: 20px;
  min-width: 220px;
  ${media.tablet`
    padding: 30px 20px 10px;
    border-right: 1px solid #a4a4a4;
  `}
`;
const MarginWrapper = styled.div`
  margin-top: 60px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Icon = styled.img`
  margin-right: 15px;
`;

const StyledFooter = styled.footer`
  font-weight: 300;
  margin: 30px 0;
  font-size: 12px;
`;

const Footer = ({ lang, isLightboxOpen }) => {
  if(isLightboxOpen) return null;
  return (
    <>
      <MarginWrapper>
        <Wrapper>
          <FooterElement>
            <FooterParagraph head>{misc.workshop[lang]}</FooterParagraph>
            <FooterParagraph>ul. dzielna 7</FooterParagraph>
            <FooterParagraph>01-154 warszawa,</FooterParagraph>
            <FooterParagraph>{misc.poland[lang]}</FooterParagraph>
          </FooterElement>
          <FooterElement borderTop>
            <FooterParagraph head>{misc.contact[lang]}</FooterParagraph>
            <FooterParagraph>platero@platero.eu</FooterParagraph>
          </FooterElement>
          <FooterElement borderTop>
            <FlexContainer onClick={() => window.location.href = "https://www.instagram.com/mmgplatero/"}><Icon src={iconIn} /><FooterParagraph hoverable>mmgplatero</FooterParagraph></FlexContainer>
          </FooterElement>
        </Wrapper>
      </MarginWrapper>
      <StyledFooter> &copy; Platero 2009 - 2020 Copyrights reserved | designed by Brandwell | developed by Pixdiver | <Link to="/cookies-policy"><span style={{color: "#585c5e", textDecoration: "underline"}}>{lang === "en" ? "Privacy Policy" : "Política de privacidad"}</span></Link></StyledFooter>
    </>
  )
}

export default connect(({ isLightboxOpen, lang }) => ({ isLightboxOpen, lang }))(Footer);
