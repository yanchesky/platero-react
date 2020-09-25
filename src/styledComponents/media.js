import { css } from 'styled-components' 

const breakpoints = {
  desktop: 960,
  tablet: 680,
  mobile: 576,
  smallest: 470,
  1056: 800,
  full: 1250
};


export default Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc
}, {})


