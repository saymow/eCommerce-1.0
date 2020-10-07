import React, { useEffect, useState, useCallback } from "react";

import { useGlobalState, useNotificationContext } from "context";

import {
  genderFormaterNumToStr,
  genderFormaterStrToNum,
} from "utils/formaters";

import withProfileLayout from "utils/withProfileLayout";

import LoadingBars from "components/LoadingBars";

import {
  Container,
  Info,
  Item,
  InfoProgress,
  ChangeData,
  Button,
  LogoutButton,
} from "styles/pages/profile/user";

import { UserDetailed } from "types/userRelated_types";

interface UserInfo {
  email: string;
  name: string;
  birth_date: string;
  cpf: string;
  confirmed: boolean;
  email_signed: boolean;
  sex?: number;
  telephone?: string;
}

const Address: React.FC = () => {
  const {
    UserApi,
    userController: { dispatch },
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();
  const { pushNotification } = useNotificationContext();

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [isEmailSigned, setIsEmailSigned] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const data = await UserApi.getPersonalInfo();

      const serializedData = {
        ...data,
        confirmed: data.confirmed === 1 ? true : 0,
        email_signed: data.email_signed === 1 ? true : 0,
        sex: genderFormaterNumToStr(data.sex),
      };

      setIsEmailSigned(data.email_signed === 1 ? true : false);

      setUserInfo(serializedData);
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
  }, [UserApi, modalDispatch]);

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
      sex: genderFormaterStrToNum((userInfo?.sex as unknown) as string),
      confirmed: undefined,
      email: undefined,
      email_signed: undefined,
    } as unknown) as UserDetailed;

    modalDispatch({
      type: "update-user",
      payload: {
        user: userDetailed,
      },
      cb: async () => {
        pushNotification({
          type: "success",
          message: "Profile updated successfuly",
        });
        fetchUserData();
      },
    });
  }

  async function handleSendConfirmationEmail() {
    pushNotification({
      type: "warning",
      message:
        "You haven't confirmed your email yet. Please check your email inbox",
    });

    await UserApi.sendConfirmationEmail();
  }

  function handleSignedCheckbox() {
    if (userInfo && !userInfo.confirmed) {
      return handleSendConfirmationEmail();
    }

    if (isEmailSigned === undefined || userInfo?.email_signed === undefined)
      return;

    setIsEmailSigned(!isEmailSigned);

    UserApi.toggleSignedEmail();
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
          <input
            type="checkbox"
            id="checkbox"
            checked={isEmailSigned}
            onChange={handleSignedCheckbox}
          />
          <label htmlFor="checkbox">
            I wish to receive promotions and news.
          </label>
        </div>
        <Button onClick={handleUpdateInformation}>Edit information</Button>
      </ChangeData>
    </Container>
  );
};

export default withProfileLayout(Address);
