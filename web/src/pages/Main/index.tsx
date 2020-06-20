import React from "react";

import Grid from "../../components/Grid";

import {
  Container,
  MainContent,
  Img,
  Content,
  AditionalContent,
} from "./styles";

const Main: React.FC = () => {
  return (
    <Container>
      <MainContent>
        <Img />
        <Content>
          <h1>E-Commerce</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
            reiciendis doloribus, debitis officia nihil optio dolorum sequi eos
            est, similique autem asperiores tempora aliquam cum distinctio, sit
            ipsa deleniti eligendi.
          </p>
        </Content>
      </MainContent>
      <AditionalContent>
        <Grid />
      </AditionalContent>
    </Container>
  );
};

export default Main;
