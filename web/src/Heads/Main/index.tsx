import React from "react";
import { Helmet } from "react-helmet";

const MainHead: React.FC = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>E-commerce</title>
    </Helmet>
  );
};

export default MainHead;
