import React                            from 'react';
import { BrowserRouter }                from 'react-router-dom'
import { Provider }                     from 'react-redux'
import { createStore }                  from 'redux'

import { GlobalStyle }                  from 'styledComponents'
import { translateLinks }               from 'helpers'

import Main                             from './pages/Main'

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

  render(){
    return (
      <BrowserRouter>
        <Provider store={store}>
          <GlobalStyle />
          <Main />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
