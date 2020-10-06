import React from "react";

import Context from "context/index";
import NotificationContext from "context/notification";

import GlobalStyles from "styles/globalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <NotificationContext>
        <GlobalStyles />
        <Component {...pageProps} />
      </NotificationContext>
    </Context>
  );
}

export default MyApp;
