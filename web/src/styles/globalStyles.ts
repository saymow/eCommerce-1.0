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

