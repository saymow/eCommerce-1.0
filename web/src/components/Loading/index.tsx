import React from 'react';
import LoadingComponent from "react-loading";

import { Container } from "./styles";

const Loading: React.FC = () => {
  return (
    <Container>
      <LoadingComponent type="bars" width={"20%"} height={"20%"} color={"#eee"}/>
    </Container>
  );
}

export default Loading;