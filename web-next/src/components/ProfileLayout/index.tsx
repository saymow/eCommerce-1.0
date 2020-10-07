import React, { useState } from "react";

// import NotFoundPage from "Pages/NotFoundPage";

import Layout from "components/Layout";
import SideBar from "components/ProfileLayout/SideBar";

import {
  Container,
  RouteNavigatorWrapper,
  ContentWrapper,
  Drawer,
} from "./styles.ts";

const Profile: React.FC = ({ children }) => {
  const [showRouteNavigator, setShowRouteNavigator] = useState(false);

  return (
    <Layout>
      <Container>
        <RouteNavigatorWrapper className={showRouteNavigator ? "opened" : ""}>
          <Drawer onClick={() => setShowRouteNavigator(!showRouteNavigator)}>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Drawer>
          <SideBar
            listItem={[
              {
                title: "My profile",
                path: "/profile/me",
              },
              {
                title: "My History",
                path: "/profile/history",
              },
              {
                title: "My addresses",
                path: "/profile/address",
              },
              {
                title: "Change password",
                path: "/profile/change_password",
              },
            ]}
          />
        </RouteNavigatorWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </Container>
    </Layout>
  );
};

export default Profile;
