import * as utils from "./utils";

describe("createCustomValidators", () => {
  it("should return Object with validation property as key and validator fn as value", () => {
    const validators = utils.createCustomValidators({
      type: "string",
      format: "email",
    });

    expect(typeof validators.type).toBe("function");
    expect(typeof validators.format).toBe("function");
  });

  it("should omit properties which are valid for HTML", () => {
    const validators = utils.createCustomValidators({
      required: true,
      format: "email",
    });

    expect(validators.format).toBeDefined();
    expect(validators.required).not.toBeDefined();
  });

  it("should omit unknown validation properties", () => {
    const validators = utils.createCustomValidators({
      anyProp: true,
      format: "email",
    });

    expect(validators.format).toBeDefined();
    expect(validators.anyProp).not.toBeDefined();
  });
});

describe("createHtmlValidationAttribs", () => {
  it("should return list of valid input html attributes as [key, value]", () => {
    const attributes = utils.createHtmlValidationAttribs({
      required: true,
    });
    expect(attributes).toEqual({
      required: true,
    });
  });

  it("should omit properties which are not valid for HTML", () => {
    const attributes = utils.createHtmlValidationAttribs({
      anyInvalid: true,
      required: true,
    });
    expect(attributes).not.toHaveProperty("anyInvalid");
    expect(attributes).toHaveProperty("required");
  });
});
