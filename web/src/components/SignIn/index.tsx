import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import Api from "../../Services/api";
import { LoginSchema } from "../../Helper/formRelated_helper";

import Input from "../Input";

import {
  Container,
  Form,
  InputField,
  Button,
  EmailIcon,
  PasswordIcon,
  SignUpMessage,
  SignUpIcon,
} from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          Api.post("login", values).then((response) => {
            console.log(response);
          });
          console.log("testing");
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
      <SignUpMessage>
        <Link to="/checkout/authenticate/signup">
          <SignUpIcon /> Sign up
        </Link>
      </SignUpMessage>
    </Container>
  );
};

export default SignIn;
