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
    --background-secondary: #f7f7f9;
    --primary: #353438;
    --secondary: #898980;
    --tertiary: #6c9a8b;

    --shadow-lv1: rgb(34, 34, 44, .05);
    --shadow-lv2: rgba(0, 0, 0, .1);

    --box-shadow: .6rem .6rem 1rem .3rem var(--shadow-lv2);

    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
  }

  body {
    background: var(--background-primary);
  }

  *, button, input {
    font-family: 'Montserrat', sans-serif;
    border: 0;
  }
`;
