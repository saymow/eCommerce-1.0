import React from "react";

import Context from "./context";
import Routes from "./Routes/Route";

import GlobalStyles from "./styles/globalStyles";

function App() {
  return (
    <Context>
      <Routes />
      <GlobalStyles />
    </Context>
  );
}

export default App;
