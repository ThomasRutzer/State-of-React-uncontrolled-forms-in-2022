import { createValidator } from "./customValidators";
import { validateCustomValidators, validateHtmlAttributes } from "./validate";

describe("validateCustomValidators", () => {
  it("should return list with invalid custom validation errors for given value", () => {
    const errors = validateCustomValidators("this is no valid email input", {
      format: createValidator("format", "email"),
    });

    const noErrors = validateCustomValidators("test@test.de", {
      format: createValidator("format", "email"),
    });

    expect(errors).toEqual(["format"]);
    expect(noErrors).toEqual([]);
  });

  it("should be able to handle multiple custom validators", () => {
    const errors = validateCustomValidators(12345, {
      format: createValidator("format", "email"),
      type: createValidator("type", "string"),
    });

    expect(errors).toEqual(["format", "type"]);
  });
});

describe("validateHtmlAttributes", () => {
  it("should return list with invalid html attributes for given validityState", () => {
    const errors = validateHtmlAttributes(
      { valueMissing: true },
      { required: true }
    );

    const noErrors = validateHtmlAttributes(
      { valueMissing: false },
      { required: true }
    );

    expect(errors).toEqual(["required"]);
    expect(noErrors).toEqual([]);
  });
});
