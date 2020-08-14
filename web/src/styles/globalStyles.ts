import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --brand: #6462a6;
    --background: #fff;
    --primary: #353438;
    --secondary: #898980;
    --tertiary: #6c9a8b;

    --shadow-lv1: rgba(0, 0, 0, .05);
    --shadow-lv2: rgba(0, 0, 0, .1);

    --box-shadow: .6rem .6rem 1rem .3rem var(--shadow-lv2);

    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
  }

  *, button, input {
    border: 0;
  }
`;
