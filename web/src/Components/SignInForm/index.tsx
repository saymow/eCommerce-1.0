import React from "react";
import { Formik, FormikHelpers } from "formik";

import { LoginSchema } from "../../Helpers/formRelated_helper";

import Input from "../Input";

import { Form, InputField, Button, EmailIcon, PasswordIcon } from "./styles";

interface FormProps {
  email: string;
  password: string;
}

interface Props {
  submitHandler(
    value: FormProps,
    formik: FormikHelpers<FormProps>
  ): Promise<void>;
}

const SignInForm: React.FC<Props> = ({ submitHandler }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={submitHandler}
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
  );
};

export default SignInForm;
