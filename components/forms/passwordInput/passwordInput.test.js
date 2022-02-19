import { render, fireEvent } from "@testing-library/react";

import PasswordInput from ".";

const testFormId = "testForm";
const testLabelText = "testLabel";
const testName = "testName";
const testValidationProperties = {};
const testValidationMessages = {};

describe("PasswordInput", () => {
  it("should initially render a input of type 'password'", () => {
    const { container } = render(
      <PasswordInput
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={testValidationProperties}
      />
    );

    const input = container.querySelector("input");

    expect(input.getAttribute("type")).toBe("password");
  });

  it("should render an input without validation properties", () => {
    const { container } = render(
      <PasswordInput
        name={testName}
        label={testLabelText}
        formId={testFormId}
      />
    );

    const input = container.querySelector("input");

    expect(input.getAttribute("type")).toBeDefined();
  });

  it("should have option to show password which changes input type, button text and a11y text", () => {
    const { container } = render(
      <PasswordInput
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={testValidationProperties}
      />
    );

    const input = container.querySelector("input");
    const button = container.querySelector("button");
    const ariaText = container.querySelector(".visuallyHidden");

    expect(input.getAttribute("type")).toBe("password");
    expect(button.innerHTML).toBe("show");
    expect(ariaText.innerHTML).toBe("Your password is hidden");

    fireEvent.click(button);

    expect(input.getAttribute("type")).toBe("text");
    expect(button.innerHTML).toBe("hide");
    expect(ariaText.innerHTML).toBe("Your password is shown");

    fireEvent.click(button);

    expect(input.getAttribute("type")).toBe("password");
    expect(button.innerHTML).toBe("show");
    expect(ariaText.innerHTML).toBe("Your password is hidden");
  });
});
