import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import { Container, Content } from "./styles";

export interface Props {
  unboundedContent?: boolean;
}

const Layout: React.FC<Props> = ({ children, unboundedContent }) => {
  return (
    <Container>
      <Header />
      <Content unboundedContent={unboundedContent}>{children}</Content>
      <Footer />
    </Container>
  );
};

export default Layout;
