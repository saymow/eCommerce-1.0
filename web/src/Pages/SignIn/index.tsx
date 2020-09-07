import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FormikHelpers } from "formik";

import { useGlobalState } from "../../Context";

import SignIn from "../../Components/SignInForm";

import {
  Container,
  AuthContainer,
  UserDefaultImage,
  UserIcon,
  SignUpIcon,
  LinkWrapper,
} from "./styles";

interface FormProps {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const history = useHistory();

  const {
    userController: { dispatch },
    UserApi,
  } = useGlobalState();

  async function submitHandler(
    values: FormProps,
    { setErrors }: FormikHelpers<FormProps>
  ) {
    console.log("Form was submited");

    try {
      const { email, password } = values;
      const response = await UserApi.signIn(email, password);

      dispatch({
        type: "set-loggedIn",
        payload: {
          email: response.email,
          name: response.name,
        },
      });

      history.push("/profile/me");
    } catch (err) {
      setErrors(err.response.data);
    }
  }

  return (
    <Container>
      <AuthContainer>
        <UserDefaultImage>
          <UserIcon />
        </UserDefaultImage>
        <SignIn submitHandler={submitHandler} />
        <LinkWrapper>
          <Link to="/signup">
            <SignUpIcon /> Sign Up
          </Link>
        </LinkWrapper>
      </AuthContainer>
    </Container>
  );
};

export default Signin;
