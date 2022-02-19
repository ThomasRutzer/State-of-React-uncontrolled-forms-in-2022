import { createValidator } from "./customValidators";

describe("format", () => {
  it("should validate 'email' as expected", () => {
    const validator = createValidator("format", "email");

    expect(validator("test@test.de")).toBe(true);
    expect(validator("test@")).toBe(false);
    expect(validator("test@test.d")).toBe(false);
    expect(validator("")).toBe(false);
  });
});

describe("type", () => {
  it("should validate 'string' as expected", () => {
    const validator = createValidator("type", "string");

    expect(validator("anyString")).toBe(true);
    expect(validator(1234)).toBe(false);
  });

  it("should validate 'boolean' as expected", () => {
    const validator = createValidator("type", "boolean");

    expect(validator(true)).toBe(true);
    expect(validator(1234)).toBe(false);
  });
});

describe("oneOf", () => {
  it("should validate as expected", () => {
    const validator = createValidator("oneOf", [true]);

    expect(validator(true)).toBe(true);
    expect(validator("any")).toBe(false);
    expect(validator("")).toBe(false);
  });
});
