import React                            from 'react';
import { BrowserRouter }                from 'react-router-dom'
import { Provider }                     from 'react-redux'
import { createStore }                  from 'redux'

import { GlobalStyle }                  from 'styledComponents'
import { translateLinks }               from 'helpers'

import Main                             from './pages/Main'

import PopoutImage from 'assets/POP-OUT.jpg'


const initialState = {
  lang: localStorage.getItem('lang') || "en",
  cookiesAccepted: !!localStorage.getItem('cookiesAccepted'),
  isLightboxOpen: false,
  overflowIsHidden: false,
  translatedLinks: translateLinks(localStorage.getItem('lang') || "en"),
  photos: [],
  galleryCategories: [],
  exhibitions: [],
  videos: [],
  literature: [],
  news: [],
  dataFetched: false
};

const store = createStore(function(prevState = initialState, { type , value }){
  return {...prevState, [type]:value }
});

class App extends React.Component {
  componentDidMount(){
    window.scrollTo(0,0);
  }
  state = {
    isPopoutOpen: true
  }

  render(){
    return (
      <BrowserRouter>
        <Provider store={store}>
            {this.state.isPopoutOpen && <PopoutModal closePopout={() => this.setState({isPopoutOpen: false})} />}
          <GlobalStyle />
          <Main />
        </Provider>
      </BrowserRouter>
    );
  }
}

const PopoutModal = ({ closePopout }) => {
  return (
      <div style={{
          position: "absolute",
          zIndex: 4,
          background: 'rgba(0,0,0,0.8)',
          top: 0,
            left: 0,
            right: 0,
            bottom: 0,

      }}>
          <div

              style={{
                zIndex: 4,
                position: 'fixed',
                background: 'black',
                top: '120px',
                left: '50%',

                bottom: '10vh',
                transform: 'translate(-50%, 0)',
                maxHeight: '90vh',
              }}
              isOpen={true}
          >
              <span
                  onClick={closePopout}
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: '10px',
                    right: '10px',
                  }}
              >✕</span>
            <img src={PopoutImage} style={{width: '100%', maxHeight: '100%'}} alt="popout" />
          </div>
      </div>
  )
}

export default App;
