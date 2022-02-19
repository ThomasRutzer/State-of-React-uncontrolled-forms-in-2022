const oneOf = (expected) => (value) => expected.indexOf(value) !== -1;

const validateByType = (type) => {
  switch (type) {
    case "string":
      return (value) => typeof value === "string";

    case "boolean":
      return (value) => typeof value == "boolean";

    default:
      return undefined;
  }
};

const validateByFormat = (formatType) => {
  switch (formatType) {
    case "email":
      return (value) => {
        const res =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return res.test(String(value).toLowerCase());
      };

    default:
      return undefined;
  }
};

const createValidator = (name, matcher) => {
  switch (name) {
    case "format":
      return validateByFormat(matcher);

    case "type":
      return validateByType(matcher);

    case "oneOf":
      return oneOf(matcher);

    default:
      return undefined;
  }
};

export { createValidator };
