import { css } from 'styled-components';
import theme from '../index';

const { breakpoints } = theme;

export default function breakpointsMedia(cssByBreakpoints) {
  const breakpointsNames = Object.keys(cssByBreakpoints); // pega as keys do objeto (xs, sm, etc)

  return breakpointsNames.map(
    (breakpointName) => css`
      @media screen and (min-width: ${breakpoints[breakpointName]}px) {
        ${cssByBreakpoints[breakpointName]}
      }
    `
  );
}
