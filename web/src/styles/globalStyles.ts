import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --brand: #6462a6;
    --background: #fff;
    --primary: #403f4c;
    --secondary: #898980;
    --tertiary: #6c9a8b;

    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
  }

  *, button, input {
    border: 0;
  }
`;

export const Transitions = styled.div`
  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    z-index: 1;
  }

  &.fader-appear-active,
  &.fade-enter,
  .fade-enter-active {
    opacity: 1;
    transition: opacity 600ms linear 300ms;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms linear;
  }
`;
