import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../Context";
import { useBuyingFlowState } from "../BuyingFlowManager";

import { LoginSchema } from "../../Helper/formRelated_helper";

import Input from "../Input";

import {
  Container,
  Form,
  InputField,
  Button,
  EmailIcon,
  PasswordIcon,
  LinkWrapper,
  SignUpIcon,
} from "./styles";

const SignIn: React.FC = (props) => {
  const { UserApi, next } = useBuyingFlowState();
  const {
    userController: { dispatch },
    buyingController: { dispatch: FlowDispatcher },
  } = useGlobalState();

  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setErrors }) => {
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
        }}
      >
        <Form>
          <InputField>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              Icon={EmailIcon}
            />
          </InputField>
          <InputField>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              Icon={PasswordIcon}
            />
          </InputField>
          <Button type="submit">Sign in</Button>
        </Form>
      </Formik>
      <LinkWrapper>
        <Link to="/checkout/authenticate/signup">
          <SignUpIcon /> Sign up
        </Link>
      </LinkWrapper>
    </Container>
  );
};

export default SignIn;
