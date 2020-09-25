import React, { Component }     from 'react'
import styled                   from 'styled-components'
import { connect }              from 'react-redux'
import { withRouter }           from 'react-router-dom'

import ExhibitionCard           from 'components/ExhibitionCard'
import Heading                  from 'components/Heading'
import media                    from 'styledComponents/media'

import { getExhibitions }       from 'requests'

const CategoriesWrapper = styled.div`
  display: inline-grid;
  width: calc(100%);
  grid-template-columns: 1fr;
  ${media.mobile`
    grid-template-columns: ${props => props.horizontal ? "1fr" : "1fr 1fr"};
  `};
  grid-gap: 30px;
  margin-bottom: 40px;
`;

class GalleryCategories extends Component {
  state = {
    exhibitions: this.props.exhibitions || []
  };

  componentDidMount = async () => {
    if(this.state.exhibitions.length === 0){
      const exhibitions = await getExhibitions();
      this.setState({ exhibitions })
    }
  };

  render(){
    const category = this.props.match.params.category;
    const { home, horizontal, title, lang } = this.props;
    const { exhibitions } = this.state;

    const isMoreContent = home && exhibitions.length > 4;
    const filteredExhibitions = isMoreContent ? exhibitions.slice(0, 4) : exhibitions;
    const specificCategory = category && exhibitions.filter(el => el.id === +category);

    return (
      category ?
        <>
          <Heading>{title}</Heading>
          <CategoriesWrapper horizontal={horizontal}>
            {
              specificCategory.map((el, index) =>
                <ExhibitionCard
                  key={index}
                  labelPhoto={el.label_photos.med}
                  name={el.place_of_exhibition_en}
                  place={el[lang].place}
                  city={el[lang].city}
                  date={el.date_of_exhibition}
                  description={el[lang].description}
                  horizontal={horizontal}
                  trimDescription={home && el.description_en.length > 300}
                  bigTitle
                />)
            }
          </CategoriesWrapper>
        </>
      :
        <>
          <Heading>{title}</Heading>
          <CategoriesWrapper horizontal={horizontal}>
            {
              filteredExhibitions.map((el, index) =>
                <ExhibitionCard
                  key={index}
                  labelPhoto={el.label_photos.med}
                  name={el[lang].place}
                  place={el[lang].place}
                  city={el[lang].city}
                  date={el.date_of_exhibition}
                  description={el[lang].description}
                  horizontal={horizontal}
                  trimDescription={home && el.description_en.length > 300}
                  bigTitle
                />)
            }
          </CategoriesWrapper>
        </>
    )

  }
}

export default connect(
  ({ exhibitions, lang }) => ({ exhibitions, lang }),
  null
)(withRouter(GalleryCategories));
