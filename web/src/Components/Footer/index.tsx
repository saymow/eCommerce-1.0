import React, { useState } from "react";

import {
  Container,
  FooterContainer,
  Main,
  Source,
  Infomation,
  Location,
  Menu,
  Title,
  RecentReleases,
  Contact,
  Icons,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
  YoutubeIcon,
  WhatsappIcon,
  SignUpForm,
  Input,
  Button,
} from "./styles";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <Container>
      <FooterContainer>
        <Main>
          <Infomation>
            <Location>
              <Title>Contact</Title>
              <p>Street Lorem ipsum dolor</p>
              <p>City ipsum?</p>
              <p>State illum omnis</p>
              <p>Zip Code 32601-264</p>
              <p>Phone Number: 31 7992 8922</p>
              <p>Mobile Number: 31 7992 8922</p>
            </Location>
            <Menu>
              <Title>Menu</Title>
              <li>About</li>
              <li>Products</li>
              <li>Checkout</li>
              <li>Images</li>
            </Menu>
            <RecentReleases>
              <Title>Recent Releases</Title>
              <p>Red T-shirt</p>
              <p>Blue T-shirt</p>
            </RecentReleases>
          </Infomation>
          <Contact>
            <Title>Newsletter</Title>
            <SignUpForm onSubmit={handleSubmitForm}>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
                placeholder="Your email address"
              />
              <Button>Sign Up</Button>
            </SignUpForm>
            <Icons>
              <FacebookIcon />
              <InstagramIcon />
              <WhatsappIcon />
              <TwitterIcon />
              <LinkedinIcon />
              <YoutubeIcon />
            </Icons>
          </Contact>
        </Main>
        <Source>
          <div>
            <p>
              Created by: <strong>Gustavo Alves</strong>
            </p>
            <p>Check out my Github account!</p>
          </div>
        </Source>
      </FooterContainer>
    </Container>
  );
};

export default Footer;
