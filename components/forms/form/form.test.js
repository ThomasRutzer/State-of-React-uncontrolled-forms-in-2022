import { fireEvent, render, screen } from "@testing-library/react";

import Form from "./";
import TextInput from "../textInput";
import { createFormErrorMessageId } from "../utils";

const testName = "testName";
const testLabelText = "testLabel";
const testFormId = "testFormId";
const testErrorMessageId = createFormErrorMessageId(testFormId, testName);

describe("Form", () => {
  it("should disable HTML validation after mount", () => {
    const { container } = render(
      <Form onSubmit={() => {}}>
        <label htmlFor="username-input">Username</label>
        <input id="username-input" aria-label="test" required />
      </Form>
    );
    const form = container.querySelector("form");

    expect(form.getAttribute("novalidate")).toBeTruthy();
  });

  it("should focus first element after mount", () => {
    const TestForm = () => {
      return (
        <Form onSubmit={() => {}}>
          <label htmlFor="username-input">Username</label>
          <input id="username-input" aria-label="test" required />
        </Form>
      );
    };
    render(<TestForm />);
    const input = screen.getByLabelText("test");

    expect(document.activeElement === input).toBeTruthy();
  });

  it("should call onSubmit when button is clicked", () => {
    const submitHandler = jest.fn();
    const TestForm = () => {
      return (
        <Form onSubmit={submitHandler}>
          <button>Submit</button>
        </Form>
      );
    };

    const { container } = render(<TestForm />);
    const button = container.querySelector("button");

    fireEvent.click(button);

    expect(submitHandler).toHaveBeenCalled();
  });

  it("should not call onSubmit when some form fields are invalid but show error messages", () => {
    const errorMessage = "Field is required";
    const submitHandler = jest.fn();
    const TestForm = () => {
      return (
        <Form onSubmit={submitHandler}>
          <TextInput
            name={testName}
            label={testLabelText}
            formId={testFormId}
            validationMessages={{ required: errorMessage }}
            validationProperties={{ required: true }}
          />
          <button>Submit</button>
        </Form>
      );
    };

    const { container } = render(<TestForm />);
    const button = container.querySelector("button");

    fireEvent.click(button);

    const errorMessages = container.querySelector(`#${testErrorMessageId}`);

    expect(errorMessages.firstChild.innerHTML).toBe(`Error: ${errorMessage}`);
    expect(submitHandler).not.toHaveBeenCalled();
  });

  it("should call onSubmit when form fields are valid and shows no error messages", () => {
    const errorMessage = "Field is required";
    const submitHandler = jest.fn();

    const TestForm = () => {
      return (
        <Form onSubmit={submitHandler}>
          <TextInput
            name={testName}
            label={testLabelText}
            formId={testFormId}
            validationMessages={{ required: errorMessage }}
            validationProperties={{ required: true }}
          />
          <button>Submit</button>
        </Form>
      );
    };

    const { container } = render(<TestForm />);
    const button = container.querySelector("button");
    const input = container.querySelector("input");

    fireEvent.input(input, { target: { value: "any value" } });
    fireEvent.click(button);

    const errorMessages = container.querySelector(`#${testErrorMessageId}`);

    expect(errorMessages.hasChildNodes()).toBe(false);
    expect(submitHandler).toHaveBeenCalled();
  });
});
