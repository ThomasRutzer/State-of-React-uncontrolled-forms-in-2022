import { configValidatorsToValidityStates } from "./validationConfig";

const validateHtmlAttributes = (validityState, inputValidationAttributes) =>
  Object.keys(inputValidationAttributes).reduce((allErrors, currValidation) => {
    const mappedValidityState =
      configValidatorsToValidityStates[currValidation];

    return validityState[mappedValidityState]
      ? [...allErrors, currValidation]
      : allErrors;
  }, []);

const validateCustomValidators = (value, customValidators) =>
  Object.keys(customValidators).filter((validator) =>
    typeof customValidators[validator] === "function"
      ? !customValidators[validator](value)
      : false
  );

export { validateHtmlAttributes, validateCustomValidators };
