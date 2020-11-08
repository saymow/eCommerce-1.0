import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormikHelpers } from "formik";

import { useGlobalState } from "context";

import Layout from "components/Layout";
import SignUpForm from "components/SignUpForm";

import {
  Container,
  FormContainer,
  LinkWrapper,
  SignInIcon,
} from "styles/pages/signup";

interface DataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  cpf: string;
}

const SignUp: React.FC<{ redirected?: boolean }> = ({ redirected }) => {
  const {
    UserApi,
    userController: { dispatch },
  } = useGlobalState();
  const history = useRouter();

  // PROVISORY
  (async function () {
    if (redirected) {
      await history.replace("/signup");
    }
  })();

  async function handleSubmit(
    values: DataProps,
    { setErrors }: FormikHelpers<DataProps>
  ) {
    try {
      const { name, email, password, cpf, birthDate } = values;

      const response = await UserApi.signUp(
        name,
        email,
        password,
        cpf,
        birthDate
      );

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
        <FormContainer>
          <SignUpForm handleSubmit={handleSubmit} />
        </FormContainer>
        <Link href="/signin">
          <LinkWrapper>
            <SignInIcon /> Sign in
          </LinkWrapper>
        </Link>
      </Container>
    </Layout>
  );
};

export default SignUp;
