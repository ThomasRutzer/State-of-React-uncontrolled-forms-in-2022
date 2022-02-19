import { render } from "@testing-library/react";

import ErrorMessage from ".";

const testId = "testId";

describe("ErrorMessage", () => {
  it("should render a element where attribute 'id' matches prop 'describes'", () => {
    const { container } = render(<ErrorMessage describes={testId} />);

    const element = container.querySelector(`#${testId}`);

    expect(element.getAttribute("id")).toBe(testId);
  });

  it("should add 'Error' to error messages", () => {
    const messages = ["Error"];
    const { container } = render(
      <ErrorMessage describes={testId}>{messages}</ErrorMessage>
    );

    const element = container.querySelector(`#${testId}`);

    expect(element.childNodes.length).toBe(messages.length);
    expect(element.childNodes[0].innerHTML).toBe(`Error: ${messages[0]}`);
  });

  it("should render a HTML span element for each error which contains message", () => {
    const messages = ["Error", "Error2"];
    const { container } = render(
      <ErrorMessage describes={testId}>{messages}</ErrorMessage>
    );

    const element = container.querySelector(`#${testId}`);

    expect(element.childNodes.length).toBe(messages.length);
    expect(element.childNodes[0].innerHTML).toBe(`Error: ${messages[0]}`);
    expect(element.childNodes[1].innerHTML).toBe(`Error: ${messages[1]}`);
  });
});
