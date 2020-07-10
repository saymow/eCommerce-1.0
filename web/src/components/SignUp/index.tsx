import React from "react";
import { Formik } from "formik";

import Input from "../Input";
import { RegisterSchema } from "../../Helper/formRelated_helper";

import {
  Container,
  Form,
  InputField,
  TwoInputsField,
  UserIcon,
  EmailIcon,
  PasswordIcon,
  IdIcon,
  DateIcon,
  Button,
} from "./styles";

const SignUp: React.FC = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          birthDate: "",
          cpf: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <InputField>
            <Input type="text" name="name" placeholder="Name" Icon={UserIcon} />
          </InputField>
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
          <InputField>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              Icon={PasswordIcon}
            />
          </InputField>
          <TwoInputsField>
            <Input
              type="text"
              name="cpf"
              placeholder="CPF"
              maxLength={11}
              Icon={IdIcon}
            />
            <Input
              type="text"
              name="birthDate"
              placeholder="Birth date"
              Icon={DateIcon}
            />
          </TwoInputsField>

          <Button>Sign up</Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignUp;
