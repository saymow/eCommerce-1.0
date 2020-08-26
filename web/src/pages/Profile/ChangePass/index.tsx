import React from "react";
import { Form, Formik } from "formik";

import { useGlobalState } from "../../../Context";
import { changePassSchema } from "../../../Helpers/formRelated_helper";

import Input from "../../../Components/Input";

import {
  Container,
  FormContainer,
  Text,
  FieldSet,
  PassIcon,
  Button,
} from "./styles";

const ChangePass: React.FC = () => {
  const { UserApi } = useGlobalState();

  return (
    <Container>
      <FormContainer>
        <Text>
          <h1>So you have forgotten your password?</h1>
          <p>Confirm a new password and check's our confirmation email.</p>
        </Text>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            confirmation: "",
          }}
          validationSchema={changePassSchema}
          onSubmit={async (values, { setErrors }) => {
            const { password, newPassword } = values;

            try {
              await UserApi.changePass(password, newPassword);

              alert("password was changed!");
            } catch (error) {
              if (error.response.status === 409) setErrors(error.response.data);
              else console.log(error.response);
            }
          }}
        >
          <Form>
            <FieldSet>
              <Input
                type="password"
                name="password"
                Icon={PassIcon}
                placeholder="Password"
              />
            </FieldSet>
            <FieldSet>
              <Input
                type="password"
                name="newPassword"
                Icon={PassIcon}
                placeholder="New password"
              />
            </FieldSet>
            <FieldSet>
              <Input
                type="password"
                name="confirmation"
                Icon={PassIcon}
                placeholder="Confirmation"
              />
            </FieldSet>
            <Button type="submit">Change password</Button>
          </Form>
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default ChangePass;
