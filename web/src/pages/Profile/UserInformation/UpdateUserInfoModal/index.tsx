import React from "react";
import { Formik } from "formik";

import { useGlobalState } from "Context";

import { genderOptions } from "../../../../Utils/formaters";

import ModalMockup from "../../../../Components/Modal";
import Input from "../../../../Components/Input";
import Select from "../../../../Components/Select";

import {
  DetailedUserSchema,
  cpfMask,
  dateMask,
  telephoneMask,
} from "../../../../Helpers/formRelated_helper";

import {
  Container,
  Form,
  InputDiv,
  TwoInputsDiv,
  Button,
  EmailIcon,
  CpfIcon,
  DateIcon,
  NameIcon,
} from "./styles";

import { UserDetailed } from "../../../../Types/userRelated_types";

interface Props {
  user: UserDetailed;
  cb: () => Promise<void>;
  closeModal: () => void;
}

const UpdateUserInfoModal: React.FC<Props> = ({ closeModal, cb, user }) => {
  const {
    UserApi,
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();

  return (
    <ModalMockup closeModal={closeModal}>
      <Container>
        <Formik
          initialValues={{
            sex: 0,
            telephone: "",
            ...user,
          }}
          validationSchema={DetailedUserSchema}
          onSubmit={async (values) => {
            try {
              await UserApi.updatePersonalInfo(values);
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

            cb();
            closeModal();
          }}
        >
          <Form>
            <InputDiv>
              <Input
                name="name"
                type="text"
                placeholder="Name"
                Icon={NameIcon}
              />
            </InputDiv>

            <TwoInputsDiv>
              <InputDiv>
                <Input
                  name="telephone"
                  type="text"
                  placeholder="Telephone"
                  Icon={EmailIcon}
                  mask={telephoneMask}
                />
              </InputDiv>
              <InputDiv>
                <Input
                  name="birth_date"
                  type="text"
                  placeholder="Birthdate"
                  Icon={DateIcon}
                  mask={dateMask}
                />
              </InputDiv>
            </TwoInputsDiv>

            <TwoInputsDiv className="inversed">
              <InputDiv>
                <Input
                  name="cpf"
                  type="text"
                  placeholder="Cpf"
                  Icon={CpfIcon}
                  mask={cpfMask}
                />
              </InputDiv>
              <InputDiv>
                <Select name="sex" placeholder="Sex" Icon={EmailIcon}>
                  {genderOptions.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </Select>
              </InputDiv>
            </TwoInputsDiv>
            <Button type="submit">Edit</Button>
          </Form>
        </Formik>
      </Container>
    </ModalMockup>
  );
};

export default UpdateUserInfoModal;
