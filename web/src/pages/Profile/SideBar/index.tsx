import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalState } from "../../../Context";

import {
  Container,
  Profile,
  Avatar,
  BackDrop,
  AvatarIcon,
  UploadIcon,
  Description,
  ItemList,
  ListItem,
  ForwardIcon,
} from "./styles";

interface SideBarItem {
  title: string;
  path: string;
}

interface Props {
  image?: string;
  listItem: SideBarItem[];
}

const SideBar: React.FC<Props> = ({ listItem, image }) => {
  const location = useLocation();

  const {
    userController: { user },
  } = useGlobalState();

  const currentPath = useMemo(() => location.pathname, [location]);

  return (
    <Container>
      <Profile>
        <Avatar>
          <BackDrop>
            <UploadIcon onClick={() => alert("Upload image, to-do.")} />
          </BackDrop>
          <AvatarIcon />
        </Avatar>
        <Description>
          <p>Welcome, {user?.name}</p>
          <p>Glad to see you here.</p>
        </Description>
      </Profile>
      <ItemList>
        {listItem.map((item) => (
          <Link key={item.title} to={item.path}>
            <ListItem selected={currentPath === item.path}>
              <p>{item.title}</p>
              <ForwardIcon selected={currentPath === item.path} />
            </ListItem>
          </Link>
        ))}
      </ItemList>
    </Container>
  );
};

export default SideBar;
