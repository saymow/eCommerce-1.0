import React, { Dispatch, SetStateAction } from "react";
import { useField } from "formik";

import { StyledComponent } from "styled-components";
import { StyledIcon } from "styled-icons/types";

import { Container, Select, ErrorSpan } from "./styles";

interface Props {
  name: string;
  id?: string;
  stateWatcher?: Dispatch<SetStateAction<undefined | string>>;
  placeholder?: string;
  disabled?: boolean;
  Icon: StyledComponent<StyledIcon, any, {}, never>;
}

const FormSelect: React.FC<Props> = ({ Icon, stateWatcher, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Container>
      <Select
        {...field}
        {...props}
        onChange={(event) => {
          if (stateWatcher) stateWatcher(event.target.value);
          field.onChange(event);
        }}
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

export default FormSelect;
