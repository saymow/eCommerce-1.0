import React from 'react';
import LoadingComponent from "react-loading";

import { Container } from "./styles";

const Loading: React.FC = () => {
  return (
    <Container>
      <LoadingComponent type="bars" width={"30%"} height={"30%"} color={"#ececec"}/>
    </Container>
  );
}

export default Loading;