import React                  from 'react'
import styled                 from 'styled-components'
import { connect }            from "react-redux";
import { Link }               from 'react-router-dom'

import MainCard               from './MainCard'
import Heading                from "./Heading";
import ShowMoreButton         from "./ShowMoreButton";

import media                  from 'styledComponents/media'
import { misc }               from "../lang";
import { pickRouteFromArray } from "../helpers";

const CategoriesWrapper = styled.div`
  z-index: 1;
  display: inline-grid;
  width: calc(100%);
  grid-template-columns: 1fr;

  a:nth-child(3) {
     display: none;
  }
   
  ${media.mobile`
    grid-template-columns: 1fr 1fr;
  `}
  ${media.desktop`
    grid-template-columns: 1fr 1fr 1fr;
    a:nth-child(3) {
     display: block;
    }
  `}
  grid-gap: 30px;
`;

const checkIfTrim = string => {
  const output = string.match(/<p>/g) || [];
  return output.length > 1
};

const Exhibitions = ({ exhibitions, home, horizontal, translatedLink, lang }) => {
  const isMoreContent = home && exhibitions.length > 3;
  const filteredExhibitions = isMoreContent ? exhibitions.slice(0, 3) : exhibitions;

  return (
    <>
      <Heading home margin="60px 0 30px">{translatedLink.label}</Heading>
      <CategoriesWrapper isMoreContent={isMoreContent} horizontal={horizontal}>
        {
          filteredExhibitions.map((el, index) => (
            <Link
              key={index}
              onClick={() => {window.scrollTo(0,0)}}
              to={`${pickRouteFromArray(translatedLink.path)}/${el.id}`}
            >
              <MainCard
                labelPhoto={el.label_photos.thumbnail}
                name={el[lang].place}
                place={el[lang].place}
                city={el[lang].city}
                date={el.date_of_exhibition}
                description={el[lang].description}
                trimDescription={home && checkIfTrim(el[lang].description)}
                lang={lang}
                exhibition
              />
            </Link>
            )
          )
        }
        {(home && isMoreContent) &&
          <ShowMoreButton
            categoriesCount={(filteredExhibitions.length + 1) * 2}
            onClick={() => window.scrollTo(0,0)}
            link={translatedLink.path}
          >
            {misc.showMore[lang]}
          </ShowMoreButton>
        }
      </CategoriesWrapper>
    </>
  )
};

export default connect(({ lang }) => ({ lang }), null)(Exhibitions);