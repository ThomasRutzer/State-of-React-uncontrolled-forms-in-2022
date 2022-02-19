const htmlValidationAttributes = ["required"];

/**
 * Configured validation contraints mapped to ValidityState interface.
 * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 */
const configValidatorsToValidityStates = {
  required: "valueMissing",
};

export { htmlValidationAttributes, configValidatorsToValidityStates };
