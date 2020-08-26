import React, { useEffect, useState, useCallback } from "react";

import { useGlobalState } from "../../../Context";

import {
  genderFormaterNumToStr,
  genderFormaterStrToNum,
} from "../../../Utils/formaters";

import LoadingBars from "../../../Components/LoadingBars";

import {
  Container,
  Info,
  Item,
  InfoProgress,
  ChangeData,
  Button,
  LogoutButton,
} from "./styles";

import { UserDetailed } from "../../../Types/userRelated_types";

interface UserInfo {
  email: string;
  name: string;
  birth_date: string;
  cpf: string;
  confirmed: boolean;
  sex?: number;
  telephone?: string;
}

const Address: React.FC = () => {
  const {
    UserApi,
    userController: { dispatch },
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  const fetchUserData = useCallback(async () => {
    const data = await UserApi.getPersonalInfo();

    const serializedData = {
      ...data,
      sex: genderFormaterNumToStr(data.sex),
    };

    setUserInfo(serializedData);
  }, [UserApi]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  function logOut() {
    UserApi.logOut();
    dispatch({
      type: "unset-loggedIn",
    });
  }

  function handleUpdateInformation() {
    const userDetailed = ({
      ...userInfo,
      sex: genderFormaterStrToNum(userInfo?.sex as unknown as string),
      confirmed: undefined,
      email: undefined,
    } as unknown) as UserDetailed;

    modalDispatch({
      type: "update-user",
      payload: {
        user: userDetailed,
      },
      cb: async () => {
        await fetchUserData();
      },
    });
  }

  return !userInfo ? (
    <LoadingBars />
  ) : (
    <Container>
      <Info>
        <div>
          <LogoutButton onClick={logOut} />
          <Item>
            <p>Name:</p>
            <p>{userInfo.name}</p>
          </Item>
          <Item>
            <p>Cpf:</p>
            <p>{userInfo.cpf}</p>
          </Item>
          <Item>
            <p>Sex:</p>
            <p>{userInfo.sex}</p>
          </Item>
        </div>
        <div>
          <Item>
            <p>Telephone:</p>
            <p>{userInfo.telephone || "Undefined"}</p>
          </Item>
          <Item>
            <p>Email:</p>
            <p>{userInfo.email}</p>
          </Item>
          <Item>
            <p>Birth date:</p>
            <p>{userInfo.birth_date}</p>
          </Item>
        </div>
      </Info>
      <InfoProgress />
      <ChangeData>
        <div>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            I wish to receive promotions and news.
          </label>
        </div>
        <Button onClick={handleUpdateInformation}>Edit information</Button>
      </ChangeData>
    </Container>
  );
};

export default Address;
