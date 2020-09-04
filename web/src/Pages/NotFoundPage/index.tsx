import React from "react";

import { Container, Content, SadIcon } from "./styles";

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <SadIcon />
        <p>
          <span>404</span>Not Found
        </p>
      </Content>
    </Container>
  );
};

export default NotFoundPage;
