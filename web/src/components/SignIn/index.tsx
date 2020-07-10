import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Api from "../../Services/api";

import Input from "../Input";

import {
  Container,
  Form,
  InputField,
  Button,
  EmailIcon,
  PasswordIcon,
} from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Email is required")
            .max(320, "Email must have 320 characters or less")
            .email("Email must have a valid format"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must have at least 8 characters.")
            .max(32, "Password must have less than 32 characters.")
            .matches(
              /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g,
              "Password must contain capitalized letters and digits"
            ),
        })}
        onSubmit={async (values) => {
          Api.post("login", values).then((response) => {
            console.log(response);
          });
          console.log("testing");
        }}
      >
        <Form>
          <InputField>
            <Input type="email" name="email" Icon={EmailIcon} />
          </InputField>
          <InputField>
            <Input type="password" name="password" Icon={PasswordIcon} />
          </InputField>
          <Button>Sign in</Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignIn;
