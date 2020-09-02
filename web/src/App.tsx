import React from "react";

import NotificationsContext from "./Context/notification";
import Context from "./Context";
import Routes from "./Routes/Route";

import GlobalStyles from "./Styles/globalStyles";

function App() {
  return (
    <NotificationsContext>
      <Context>
        <Routes />
        <GlobalStyles />
      </Context>
    </NotificationsContext>
  );
}

export default App;
