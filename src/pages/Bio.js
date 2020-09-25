import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchData } from 'helpers'

import styled from 'styled-components'
import media from 'styledComponents/media'

import Heading from 'components/Heading'
import { misc } from "lang";

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 320px;
  width: 100%;
  transform: translateY(-9%);
  
  ${media.tablet`
    display: block;
    width: 35vw;
    transform: translateY(0);
  `}
`;

const TextWrapper = styled.div`
  margin: 50px 0;
  position: relative;
  
  ${media.tablet`
    display: flex;
  `}
  p{
    margin: 0 0 20px;
    font-weight: 300;
    font-size: 17px;
  }

  h2{
    margin: 32px 0;
  }
`;

const ColumnsWrapper = styled.div`
  ${media.tablet`
    margin-left: 20px;
  `}
`;

const PhotoWrapper = styled.div`
  height: 350px;
  overflow: hidden;
  margin-bottom: 30px;
  ${media.tablet`
    overflow: visible;
    height: auto;
  `}
`;

const ShowMoreButton = styled.span`
  font-family: 'Barlow', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`;

const ExtendedBioBody = styled.div`
  margin: 0 0 20px 0;
  font-weight: 300;
  font-size: 17px;
  ${props => props.marginTop && `margin-top: 20px`};

  ul li{
    list-style: disc inside;
  }
  ol li{
    list-style: decimal inside;
  }
  a{
    font-weight: 600;
  }
  a:hover{
    text-decoration: underline;
  }
  p{
    margin: 0 0 15px 0;
  }
`;

class Bio extends Component {
  state = {
    extendedBio: null,
    extendedBioClicked: false,
    bio: null
  };


  componentDidMount = async () => {
    const response = await fetchData("https://dev.platero.eu/wp-json/wp/v2/bio/");
    const extendedBio = response.find(el => el.slug === "bio-extended");
    const regularBio = response.find(el => el.slug === "bio");

    this.setState({
      extendedBio: {
        en: extendedBio.acf.content_en,
        es: extendedBio.acf.content_es
      },
      bio: {
        en: regularBio.acf.content_en,
        es: regularBio.acf.content_es
      }
    })
  };

  render(){
    const { bio, extendedBio, extendedBioClicked } = this.state;
    const { lang } = this.props;

    return (
      <>
        <Heading>Bio</Heading>
        <TextWrapper>
          <PhotoWrapper><StyledImage src="photos/platero-photo_1.jpg" /></PhotoWrapper>
          <ColumnsWrapper>
            {bio &&
              <ExtendedBioBody dangerouslySetInnerHTML={{__html: bio[lang]}} />
            }
            {(extendedBio && extendedBio[lang]) &&
              <ShowMoreButton onClick={() => this.setState({extendedBioClicked: true})}>
                {misc.readMore[lang]}
              </ShowMoreButton>
            }
            {extendedBioClicked &&
              <ExtendedBioBody marginTop dangerouslySetInnerHTML={{__html: extendedBio[lang]}} />
            }
          </ColumnsWrapper>
        </TextWrapper>
      </>
    )
  }
}

export default connect(({ lang }) => ({ lang }), null)(Bio)