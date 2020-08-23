import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --brand: #6462a6;
    --background-primary: #fff;
    --background-secondary: #ece7fe59;
    --primary: #353438;
    --secondary: #898980;
    --tertiary: #6c9a8b;

    --shadow-lv1: rgb(34, 34, 44, .05);
    --shadow-lv2: rgba(0, 0, 0, .1);

    --box-shadow: .6rem .6rem 1rem .3rem var(--shadow-lv2);

    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;

    @media(max-width: 960px) {
      font-size: 56.25%;
    }

    @media (max-width: 720px) {
      font-size: 50%;
    }
  }

  body {
    background: var(--background-primary);
  }

  p, h1, h2, h3, h4, h5, h6, strong {
    color: var(--primary);
  }

  *, button, input {
    font-family: 'Montserrat', sans-serif;
    border: 0;
  }
`;
