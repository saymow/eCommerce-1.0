import React from "react";
import { FormikHelpers } from "formik";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../../Context";
import { useBuyingFlowState } from "../Controller";

import SignInForm from "../../SignInForm";

import { Container, LinkWrapper, SignUpIcon } from "./styles";

interface FormProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { next } = useBuyingFlowState();
  const {
    userController: { dispatch },
    buyingController: { dispatch: FlowDispatcher },
    UserApi,
  } = useGlobalState();

  async function submitHandler(
    values: FormProps,
    { setErrors }: FormikHelpers<FormProps>
  ) {
    try {
      const { email, password } = values;

      const response = await UserApi.signIn(email, password);

      if (response.error) throw response.error;

      dispatch({
        type: "set-user",
        payload: {
          email: response.email,
          name: response.name,
        },
      });

      FlowDispatcher({
        type: "set-logged",
      });

      next();
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <Container>
      <SignInForm submitHandler={submitHandler} />
      <LinkWrapper>
        <Link to="/checkout/authenticate/signup">
          <SignUpIcon /> Sign up
        </Link>
      </LinkWrapper>
    </Container>
  );
};

export default SignIn;
