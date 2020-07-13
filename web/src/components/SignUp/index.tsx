import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import Input from "../Input";
import {
  RegisterSchema,
  cpfMask,
  dateMask,
} from "../../Helper/formRelated_helper";

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
  LinkWrapper,
  LoginIcon
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
              mask={cpfMask}
              Icon={IdIcon}
            />
            <Input
              type="text"
              name="birthDate"
              placeholder="Birth date"
              mask={dateMask}
              Icon={DateIcon}
            />
          </TwoInputsField>

          <Button>Sign up</Button>
        </Form>
      </Formik>
      <LinkWrapper>
      <LoginIcon />
      <Link to="/checkout/authenticate">Sign in</Link>
      </LinkWrapper>
    </Container>
  );
};

export default SignUp;
