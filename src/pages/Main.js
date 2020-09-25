import React, {Component}             from 'react';
import { Switch }                     from "react-router-dom";
import { connect }                    from "react-redux";
import styled                         from "styled-components";

import Header                         from "components/Header";
import Routes                         from "routes";
import Footer                         from "components/Footer";
import CookiesTab                     from "components/CookiesTab";
import media                          from "styledComponents/media";
import {
  mainStateToProps
}                                     from 'helpers'

const PagesWrapper = styled.div`
  opacity: ${props => props.isHidden ? 0 : 1};
  display: ${props => props.isHidden ? "none" : "block"};
  max-width: 1200px;
  width: auto;
  margin: 10px auto;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background: white;
`;

const MainWrapper = styled.div`
  margin: 0 20px;
  ${media.mobile`
    margin: 0 30px;
  `}
`;

class Main extends Component {
  render() {
    const { overflowIsHidden, lang } = this.props;
    return (
      <>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Switch>
          <MainWrapper>
            <PagesWrapper isHidden={overflowIsHidden}>
              <Routes lang={lang} />
              <Footer />
              <CookiesTab />
            </PagesWrapper>
          </MainWrapper>
        </Switch>
      </>
    );
  }
}

export default connect(mainStateToProps, null)(Main);