import React from "react";
import { FormikHelpers } from "formik";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../../context";
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
    buyingController: { dispatch: FlowDispatch },
    modalController: { dispatch: modalDispatch },
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

      FlowDispatch({
        type: "set-logged",
      });

      next();
    } catch (err) {
      if (err.response.status === 409) {
        return setErrors(err.response.data);
      }

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
