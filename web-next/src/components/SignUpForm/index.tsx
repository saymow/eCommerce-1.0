import React from "react";
import { Formik, FormikHelpers } from "formik";

import Input from "../Input";

import {
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

import {
  RegisterSchema,
  cpfMask,
  dateMask,
} from "../../helpers/formRelated_helper";

interface DataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  cpf: string;
}

interface Props {
  handleSubmit(
    value: DataProps,
    formik: FormikHelpers<DataProps>
  ): Promise<void>;
}

const SignUpForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
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
      onSubmit={handleSubmit}
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

        <Button type="submit">Sign up</Button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
