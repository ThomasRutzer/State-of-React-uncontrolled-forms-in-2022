import { htmlValidationAttributes } from "./validationConfig";
import { createValidator } from "./customValidators";

/**
 * @param {Object} validationProperties, e.g. {format: "email"}
 * @returns {Object.<string, Function>} customValidators where key matches validationPropertyy key (e.g. format) and value is custom validator
 */
const createCustomValidators = (validationProperties) => {
  return Object.keys(validationProperties).reduce(
    (allCustomValidators, currValidationProp) => {
      const omitHtmlValidators =
        htmlValidationAttributes.includes(currValidationProp);

      if (omitHtmlValidators) {
        return allCustomValidators;
      } else {
        return {
          ...allCustomValidators,
          [currValidationProp]: createValidator(
            currValidationProp,
            validationProperties[currValidationProp]
          ),
        };
      }
    },
    {}
  );
};

/**
 * @param {Object} validationProperties, e.g. {required: true}
 * @returns {Object.<string, any} valid HTML attributes, filters invalid. {key, value} matches validationProperty (e.g. {required: true})
 */
const createHtmlValidationAttribs = (validationProperties) => {
  return Object.keys(validationProperties).reduce(
    (allAttributes, currValidation) => {
      const validHtmlAttrbute =
        htmlValidationAttributes.includes(currValidation);

      return validHtmlAttrbute
        ? {
            ...allAttributes,
            [currValidation]: validationProperties[currValidation],
          }
        : allAttributes;
    },
    {}
  );
};

export { createHtmlValidationAttribs, createCustomValidators };
