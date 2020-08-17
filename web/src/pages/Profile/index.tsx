import React from "react";
import { Switch } from "react-router-dom";

import RestrictedRoute from "../../Components/RestrictedRoute";

import SideBar from "./SideBar";
import UserInformation from "./UserInformation";
import History from "./History";
import Addresses from "./Addresses";

import { Container, ProfileWrapper } from "./styles";

const Profile: React.FC = () => {
  return (
    <Container>
      <ProfileWrapper>
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

        <Switch>
          <RestrictedRoute path="/profile/me" component={UserInformation} />
          <RestrictedRoute path="/profile/history" component={History} />
          <RestrictedRoute path="/profile/address" component={Addresses} />
          <RestrictedRoute
            path="/profile/change_password"
            component={() => <h1>change_password</h1>}
          />
        </Switch>
      </ProfileWrapper>
    </Container>
  );
};

export default Profile;
