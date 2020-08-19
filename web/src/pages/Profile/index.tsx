import React from "react";
import { Switch, Route } from "react-router-dom";

import RestrictedRoute from "../../Components/RestrictedRoute";

import SideBar from "./SideBar";
import UserInformation from "./UserInformation";
import History from "./History";
import Addresses from "./Addresses";
import ChangePass from "./ChangePass";

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
          <Route path="/profile/me" component={UserInformation} />
          <Route path="/profile/history" component={History} />
          <Route path="/profile/address" component={Addresses} />
          <Route path="/profile/change_password" component={ChangePass} />
        </Switch>
      </ProfileWrapper>
    </Container>
  );
};

export default Profile;
