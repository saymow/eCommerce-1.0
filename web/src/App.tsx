import React from "react";

import Context from "./Context";
import Routes from "./Routes/Route";

import GlobalStyles from "./Styles/globalStyles";

function App() {
  return (
    <Context>
      <Routes />
      <GlobalStyles />
    </Context>
  );
}

export default App;
