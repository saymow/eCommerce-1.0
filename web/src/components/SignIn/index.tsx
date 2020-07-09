import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Api from "../../Services/api";

import {
  Container,
  Form,
  InputDiv,
  Input,
  Button,
  EmailIcon,
  PasswordIcon,
  ErrorSpan,
} from "./styles";

const SignIn: React.FC = () => {
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (values) => {
      const response = await Api.post("login", values);

      console.log(response);
    },
  });


  return (
    <Container>
      <Form onSubmit={Formik.handleSubmit}>
        <InputDiv>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            value={Formik.values.email}
            className={
              Formik.touched.email && Formik.errors.email
                ? "haveError"
                : Formik.touched.email
                ? "haveNoErrors"
                : ""
            }
          />
          <EmailIcon />
          {Formik.touched.email && Formik.errors.email ? (
            <ErrorSpan>{Formik.errors.email}</ErrorSpan>
          ) : null}
        </InputDiv>

        <InputDiv>
          <Input
            type="password"
            id="password"
            name="password"
            onBlur={Formik.handleBlur}
            onChange={Formik.handleChange}
            value={Formik.values.password}
            className={
              Formik.touched.password && Formik.errors.password
                ? "haveError"
                : Formik.touched.password
                ? "haveNoErrors"
                : ""
            }
          />
          <PasswordIcon />
          {Formik.touched.password && Formik.errors.password ? (
            <ErrorSpan>{Formik.errors.password}</ErrorSpan>
          ) : null}
        </InputDiv>
        <Button>Sign in</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
