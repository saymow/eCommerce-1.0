import React from "react";
import { Link } from "react-router-dom";

import Grid from "../../Components/Grid";

import {
  Container,
  MainContent,
  Content,
  CommandButtons,
  AditionalContent,
  ContentElement,
  ContentWrapper,
  Separetor,
  AboutUs,
} from "./styles";

const Main: React.FC = () => {
  return (
    <Container>
      <MainContent>
        <Content>
          <h1>E-Commerce</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
            reiciendis doloribus.
          </p>
          <CommandButtons>
            <Link to="/products">Start shopping</Link>
            <a href="#about">About us</a>
          </CommandButtons>
        </Content>
      </MainContent>
      <AditionalContent>
        <ContentWrapper>
          <ContentElement>
            <Grid />
          </ContentElement>
        </ContentWrapper>
        <Separetor />
        <ContentWrapper id="about">
          <ContentElement>
            <AboutUs>
              <h2>About Us</h2>
              <p>
                &emsp; Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Earum porro at magni consectetur cumque tenetur dolore quasi
                esse possimus quos hic qui omnis provident, iure autem
                laboriosam vel libero animi! Sapiente corrupti distinctio maxime
                temporibus animi? Officiis exercitationem placeat libero illum
                iste deleniti tenetur perspiciatis atque delectus cumque. Nisi,
                mollitia dolorem? Saepe a deleniti commodi pariatur id. At, quae
                alias. Laborum minus voluptates earum doloremque accusantium
                aliquam. Adipisci officiis consequatur sed, tempora eum maxime
                eaque eligendi mollitia cum quas! Earum iste aperiam molestias
                numquam velit neque reiciendis veniam expedita qui? Quod soluta
                repellendus, dolore itaque vel natus voluptatum dicta earum
                voluptate praesentium nisi aliquid totam iusto, rem eveniet quae
                sequi debitis pariatur dignissimos magni sunt sint at.
                Reiciendis, doloremque dicta. Fugit perferendis numquam magnam
                ullam repellendus nisi obcaecati repellat deleniti doloribus
                itaque voluptas distinctio iusto tenetur, labore vero. Rerum
                animi quidem aut dolore optio, architecto repellat sapiente
                temporibus quia obcaecati.
              </p>
            </AboutUs>
          </ContentElement>
        </ContentWrapper>
      </AditionalContent>
      <Separetor />
    </Container>
  );
};

export default Main;
