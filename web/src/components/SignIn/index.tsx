import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../Context";
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

interface Props {
  ApiMananger: Object;
}

const SignIn: React.FC<Props> = (props) => {
  console.log(props);

  const {
    userController: { dispatch },
  } = useGlobalState();
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          const { email, password } = values;

          dispatch({
            type: "signIn",
            payload: {
              email,
              password,
            },
          });
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
          <Button>Sign in</Button>
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
