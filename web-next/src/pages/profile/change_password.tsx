import React from "react";
import { Form, Formik } from "formik";

import { useGlobalState, useNotificationContext } from "context";
import { changePassSchema } from "helpers/formRelated_helper";

import withProfileLayout from "utils/withProfileLayout";

import Input from "components/Input";

import {
  Container,
  FormContainer,
  Text,
  FieldSet,
  PassIcon,
  Button,
} from "styles/pages/profile/change_pass";

const ChangePass: React.FC = () => {
  const {
    UserApi,
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();
  const { pushNotification } = useNotificationContext();

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

              pushNotification({
                type: "success",
                message: "password was changed!",
              });
            } catch (err) {
              const { message } = err.response.data;
              modalDispatch({
                type: "error",
                payload: {
                  title: "Network connection error",
                  message,
                },
              });
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

export default withProfileLayout(ChangePass);
