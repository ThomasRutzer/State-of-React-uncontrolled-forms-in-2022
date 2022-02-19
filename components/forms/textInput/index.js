import { useMemo, useRef } from "react";
import PropTypes from "prop-types";

import styles from "./textInput.module.css";
import { useValidation } from "../validation";
import { createFormElementId, createFormErrorMessageId } from "../utils";

import ErrorMessage from "../errorMessage";
import Label from "../label";

const TextInput = ({
  name,
  label,
  formId,
  type = "text",
  validationProperties,
  validationMessages,
  ...inputProps
}) => {
  const inputRef = useRef();
  const formElementId = createFormElementId(formId, name);
  const errorMessageId = createFormErrorMessageId(formId, name);

  const [validate, errors, htmlValidationAttributes] = useValidation(
    validationProperties,
    validationMessages
  );

  return (
    <div className={styles["container"]}>
      <Label
        formFieldId={formElementId}
        asRequired={validationProperties["required"]}
      >
        {label}
      </Label>
      <input
        ref={inputRef}
        type={type}
        id={formElementId}
        className={styles["input"]}
        name={name}
        aria-invalid={errors.length > 0}
        aria-errormessage={errorMessageId}
        onInvalid={validate}
        onBlur={validate}
        {...htmlValidationAttributes}
        {...inputProps}
      />
      <ErrorMessage describes={errorMessageId}>
        {errors.map((error) => validationMessages[error])}
      </ErrorMessage>
    </div>
  );
};

TextInput.defaultProps = {
  validationMessages: {},
  validationProperties: {},
};

TextInput.propTypes = {
  formId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  validationProperties: PropTypes.object,
  validationMessages: PropTypes.object,
};

export default TextInput;
