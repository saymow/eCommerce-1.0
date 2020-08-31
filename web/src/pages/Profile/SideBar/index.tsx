import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalState } from "../../../Context";

import {
  Container,
  Profile,
  Avatar,
  BackDrop,
  ProfileImg,
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
  const { UserApi } = useGlobalState();
  const location = useLocation();
  const {
    userController: { user },
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const currentPath = useMemo(() => location.pathname, [location]);

  useEffect(() => {
    (async function fetchAvatar() {
      const response = await UserApi.getAvatar();

      setAvatarUrl(response.url);
    })();
  }, [UserApi]);

  async function handleUserImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) return;

    const data = new FormData();

    data.append("image", event.target.files[0]);

    try {
      const response = await UserApi.postAvatar(data);

      setAvatarUrl(response.url);
    } catch (err) {
      const { message } = err.response.data;
      modalDispatch({
        type: "error",
        payload: {
          title: "Network connection error",
          message,
        },
      });
    }
  }

  return (
    <Container>
      <Profile>
        <Avatar>
          {!avatarUrl ? (
            <AvatarIcon />
          ) : (
            <ProfileImg src={avatarUrl} alt="user" />
          )}
          <BackDrop>
            <input
              id="userImage"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleUserImageUpload}
            />
            <label htmlFor="userImage">
              <UploadIcon />
            </label>
          </BackDrop>
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
