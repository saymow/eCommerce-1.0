import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormikHelpers } from "formik";

import { useGlobalState } from "context";

import SignIn from "components/SignInForm";
import Layout from "components/Layout";

import {
  Container,
  UserDefaultImage,
  UserIcon,
  SignInContainer,
  SignUpIcon,
  LinkWrapper,
} from "styles/pages/signin";

interface FormProps {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const history = useRouter();

  const {
    userController: { dispatch },
    UserApi,
  } = useGlobalState();

  async function submitHandler(
    values: FormProps,
    { setErrors }: FormikHelpers<FormProps>
  ) {
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
    <Layout>
      <Container>
        <UserDefaultImage>
          <UserIcon />
        </UserDefaultImage>
        <SignInContainer>
          <SignIn submitHandler={submitHandler} />
        </SignInContainer>
        <Link href="/signup" passHref>
          <LinkWrapper>
            <SignUpIcon /> Sign Up
          </LinkWrapper>
        </Link>
      </Container>
    </Layout>
  );
};

export default Signin;
