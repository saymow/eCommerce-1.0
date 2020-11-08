import React from "react";

import Context, { useGlobalState } from "context/index";
import NotificationContext from "context/notification";

import GlobalStyles from "styles/globalStyles";

import { ReactFCcustom } from "types/ReactRelated_types";

function MyApp({
  Component,
  pageProps,
}: {
  Component: ReactFCcustom;
  pageProps: any;
}) {
  const {
    userController: { user, loggedIn },
  } = useGlobalState();
  let RealComponent;
  let invalidNagivation = Component.authenticate && !loggedIn;

  if (invalidNagivation) {
    RealComponent = Component.fallback as ReactFCcustom;
    pageProps.redirected = true;
  } else RealComponent = Component;

  console.log(user, loggedIn);

  const Layout =
    Component.Layout && !invalidNagivation ? Component.Layout : React.Fragment;

  return (
    <Context>
      <NotificationContext>
        <GlobalStyles />
        <Layout>
          <RealComponent {...pageProps} />
        </Layout>
      </NotificationContext>
    </Context>
  );
}

export default MyApp;
