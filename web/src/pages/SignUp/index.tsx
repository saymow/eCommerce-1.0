import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FormikHelpers } from "formik";

import { useGlobalState } from "../../Context";

import SignUpForm from "../../Components/SignUpForm";

import { Container, AuthContainer, LinkWrapper, SignInIcon } from "./styles";

interface DataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  cpf: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();

  const {
    UserApi,
    userController: { dispatch },
  } = useGlobalState();

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
    <Container>
      <AuthContainer>
        <SignUpForm handleSubmit={handleSubmit} />
        <LinkWrapper>
          <Link to="/signin">
            <SignInIcon /> Sign in
          </Link>
        </LinkWrapper>
      </AuthContainer>
    </Container>
  );
};

export default SignUp;
