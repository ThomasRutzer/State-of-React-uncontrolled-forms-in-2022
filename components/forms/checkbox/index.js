import { useRef } from "react";
import PropTypes from "prop-types";

import styles from "./checkbox.module.css";
import { useValidation } from "../validation";

import ErrorMessage from "../errorMessage";
import Label from "../label";

const Checkbox = ({
  name,
  label,
  formId,
  validationProperties,
  validationMessages,
}) => {
  const inputRef = useRef();
  const formElementId = `${formId}${name}`;
  const errorMessageId = `${formElementId}ErrorMessage`;

  const [validate, errors, htmlValidationAttributes] = useValidation(
    validationProperties,
    validationMessages
  );

  return (
    <div className={styles["checkbox-base"]}>
      <div className={styles["form"]}>
        <input
          ref={inputRef}
          id={formElementId}
          className={styles["input"]}
          type="checkbox"
          name={name}
          value={true}
          onInvalid={validate}
          onBlur={validate}
          aria-invalid={errors.length > 0}
          aria-errormessage={errorMessageId}
          {...htmlValidationAttributes}
        />
        <Label
          formFieldId={formElementId}
          asRequired={validationProperties["required"]}
        >
          {label}
        </Label>
      </div>
      <div>
        <ErrorMessage describes={errorMessageId}>
          {errors.map((error) => validationMessages[error])}
        </ErrorMessage>
      </div>
    </div>
  );
};

Checkbox.defaultProps = {
  validationMessages: {},
  validationProperties: {},
};

Checkbox.propTypes = {
  formId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validationProperties: PropTypes.object,
  validationMessages: PropTypes.object,
};

export default Checkbox;
