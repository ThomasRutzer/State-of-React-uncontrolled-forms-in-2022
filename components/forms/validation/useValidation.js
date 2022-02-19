import { useMemo, useState } from "react";

import { validateCustomValidators, validateHtmlAttributes } from "./validate";
import * as validationUtils from "./utils";

const useValidation = (validationProperties, validationMessages) => {
  const [errors, setErrors] = useState([]);

  const [htmlValidationAttributes, customValidators] = useMemo(
    () => [
      validationUtils.createHtmlValidationAttribs(validationProperties),
      validationUtils.createCustomValidators(validationProperties),
    ],
    [validationProperties]
  );

  const validate = (e) => {
    const htmlValidationErrors = validateHtmlAttributes(
      e.target.validity,
      htmlValidationAttributes
    );

    const customValidationErrors = validateCustomValidators(
      normalizeValueByType(e.target),
      customValidators
    );

    const allErrors = [...htmlValidationErrors, ...customValidationErrors];

    e.target.setCustomValidity(
      `${allErrors.map((error) => validationMessages[error])}`
    );
    setErrors(allErrors);
  };

  return [validate, errors, htmlValidationAttributes];
};

function normalizeValueByType(target) {
  if (target.type === "checkbox") {
    return target.checked;
  } else {
    return target.value;
  }
}

export default useValidation;
