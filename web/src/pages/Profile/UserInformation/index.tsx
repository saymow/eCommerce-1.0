import React, { useEffect, useState } from "react";

import { useGlobalState } from "../../../Context";

import {
  Container,
  Info,
  Item,
  InfoProgress,
  ChangeData,
  Button,
} from "./styles";

interface UserInfo {
  email: string;
  name: string;
  birth_date: string;
  cpf: string;
  confirmed: boolean;
}

const Address: React.FC = () => {
  const {
    UserApi,
  } = useGlobalState();

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    (async function getUser() {
      const data = await UserApi.getPersonalInfo();

      setUserInfo(data);
    })();
  }, [UserApi]);

  return (
    <Container>
      {!userInfo ? (
        <p>Loading...</p>
      ) : (
        <>
          <Info>
            <div>
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
                <p>Não definido</p>
              </Item>
            </div>
            <div>
              <Item>
                <p>Telephone:</p>
                <p>Não definido</p>
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
            <Button>Editar informações</Button>
          </ChangeData>
        </>
      )}
    </Container>
  );
};

export default Address;
