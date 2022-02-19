import { render, fireEvent } from "@testing-library/react";

import Checkbox from ".";
import { createFormErrorMessageId } from "../utils";

const testFormId = "testForm";
const testLabelText = "testLabel";
const testName = "testName";
const testErrorMessageId = createFormErrorMessageId(testFormId, testName);
const testValidationProperties = {};
const testValidationMessages = {};

describe("Checkbox", () => {
  it("should render a label which inner html contains given text", () => {
    const { container } = render(
      <Checkbox
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={testValidationProperties}
      />
    );

    const label = container.querySelector("label");

    expect(label).not.toBeNull();
    expect(label.innerHTML).toBe(testLabelText);
  });

  it("should connect label with input by 'for' and 'id' attribute", () => {
    const { container } = render(
      <Checkbox
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={testValidationProperties}
      />
    );

    const label = container.querySelector("label");
    const inputId = container.querySelector("input").getAttribute("id");

    expect(label.getAttribute("for")).toBe(inputId);
  });

  it("should render a input of type 'checkbox'", () => {
    const { container } = render(
      <Checkbox
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={testValidationProperties}
      />
    );

    const input = container.querySelector("input");

    expect(input.getAttribute("type")).toBe("checkbox");
  });

  it("should render an input without validation properties", () => {
    const { container } = render(
      <Checkbox name={testName} label={testLabelText} formId={testFormId} />
    );

    const input = container.querySelector("input");

    expect(input.getAttribute("type")).toBeDefined();
  });

  it("should render a input where attribute 'name' matches prop name", () => {
    const { container } = render(
      <Checkbox
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={testValidationProperties}
      />
    );

    const input = container.querySelector("input");

    expect(input.getAttribute("name")).toBe(testName);
  });

  it("should render input validation attributes which match valid passed validation properties", () => {
    const { container } = render(
      <Checkbox
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={{ required: true }}
      />
    );

    const input = container.querySelector("input");

    expect(input.getAttribute("required")).toBeThruthy;
  });

  it("should render a input where attribute 'aria-errormessage' matches id of error messages", () => {
    const { container } = render(
      <Checkbox
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={testValidationMessages}
        validationProperties={{ required: true }}
      />
    );

    const input = container.querySelector("input");
    const errorMessages = container.querySelector(`#${testErrorMessageId}`);

    expect(input.getAttribute("aria-errormessage")).toBe(
      errorMessages.getAttribute("id")
    );
  });

  it("should validate on blur and shows error messages when necessary", () => {
    const validationMessageRequired = "This field is required";
    const { container } = render(
      <Checkbox
        name={testName}
        label={testLabelText}
        formId={testFormId}
        validationMessages={{ required: validationMessageRequired }}
        validationProperties={{ required: true }}
      />
    );

    const input = container.querySelector("input");
    const errorMessages = container.querySelector(`#${testErrorMessageId}`);

    expect(errorMessages.hasChildNodes()).toBe(false);
    fireEvent.blur(input);

    expect(errorMessages.hasChildNodes()).toBe(true);
    expect(errorMessages.firstChild.innerHTML).toBe(
      `Error: ${validationMessageRequired}`
    );
  });
});
