import React from "react";
import { useField } from "formik";
import { StyledIcon } from "styled-icons/types";
import { StyledComponent } from "styled-components";

import { Container, Input, MaskedInput, ErrorSpan } from "./styles";

interface Props {
  name: string;
  Icon: StyledComponent<StyledIcon, any, {}, never>;
  type?: string;
  id?: string;
  disabled?: boolean;
  onBlur?: (arg0: React.FocusEvent<HTMLInputElement>, arg1?: string) => void;
  mask?: any[];
  placeholder?: string;
  maxLength?: number;
  max?: number;
  pattern?: string;
}

const FormInput: React.FC<Props> = ({ Icon, mask, onBlur, ...props }) => {
  const [field, meta] = useField(props);

  const InputProps = {
    ...field,
    ...props,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      field.onBlur(e);
      if (onBlur) onBlur(e, meta.error);
    },
    className:
      meta.touched && meta.error
        ? "haveError"
        : meta.touched
        ? "haveNoErrors"
        : "",
  };

  return (
    <Container>
      {/* Formik had a conflict on updating based on react-text-mask inputs, 
      which i set as default previously, this way the problem only lies on MaskeedInputs, 
      which, for now, works.  */}

      {mask ? (
        <MaskedInput {...InputProps} mask={mask} />
      ) : (
        <Input {...InputProps} />
      )}

      <Icon />

      {meta.touched && meta.error ? <ErrorSpan>{meta.error}</ErrorSpan> : null}
    </Container>
  );
};

export default FormInput;
