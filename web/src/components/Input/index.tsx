import React from "react";
import { useField } from "formik";
import { StyledIcon } from "styled-icons/types";
import { StyledComponent } from "styled-components";

import { Container, Input, ErrorSpan } from "./styles";

interface Props {
  name: string;
  type: string;
  mask?: any[];
  placeholder?: string;
  maxLength?: number;
  pattern?: string;
  Icon: StyledComponent<StyledIcon, any, {}, never>;
}

const FormInput: React.FC<Props> = ({ Icon, mask, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Container>
      <Input
        mask={mask ? mask : false}
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "haveError"
            : meta.touched
            ? "haveNoErrors"
            : ""
        }
      />
      <Icon />

      {meta.touched && meta.error ? <ErrorSpan>{meta.error}</ErrorSpan> : null}
    </Container>
  );
};

export default FormInput;
