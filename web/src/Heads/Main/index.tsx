import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MainHead: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-Commerce</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
    </HelmetProvider>
  );
};

export default MainHead;
