const createFormErrorMessageId = (formId, fieldName) => {
  return `${createFormElementId(formId, fieldName)}ErrorMessage`;
};

const createFormElementId = (formId, fieldName) => {
  return `${formId}${fieldName}`;
};

export { createFormElementId, createFormErrorMessageId };
