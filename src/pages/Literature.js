import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import styled                   from 'styled-components'

import media                    from 'styledComponents/media'
import LiteratureCard           from '../components/LiteratureCard'
import Heading                  from 'components/Heading'

import { getLiterature }        from "requests";

const CategoriesWrapper = styled.div`  
  ${media.full`
    display: flex;
  `}
`;

class Literature extends Component {

  componentDidMount = async () => {
    const literature = await getLiterature();
    this.props.dispatch('literature', literature)
  };

  render(){
    const { literature, horizontal, title, lang } = this.props;

    return (
      <>
        <Heading>{title}</Heading>
        <CategoriesWrapper horizontal={horizontal}>
          {
            literature.map((el, index) =>
              <LiteratureCard
                key={index}
                lang={lang}
                {...el}
              />)
          }
        </CategoriesWrapper>
      </>
    )
  }
}

export default connect(
  ({ literature, lang }) => ({ literature, lang }),
  dispatch => ({ dispatch: (key, value) => dispatch({type: key, value })})
)(Literature);
