import React from "react";

import Context from "context/index";
import NotificationContext from "context/notification";

import GlobalStyles from "styles/globalStyles";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <Context>
      <NotificationContext>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContext>
    </Context>
  );
}

export default MyApp;
