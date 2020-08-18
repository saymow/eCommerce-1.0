import React from "react";
import { Form, Formik } from "formik";

import Input from "../../../Components/Input";

import { Container, PassIcon } from "./styles";

const ChangePass: React.FC = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          password: "",
          newPassword: "",
          confimation: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Input type="password" name="password" Icon={PassIcon} />
          <Input type="password" name="newPassword" Icon={PassIcon} />
          <Input type="password" name="confimation" Icon={PassIcon} />
        </Form>
      </Formik>
    </Container>
  );
};

export default ChangePass;
