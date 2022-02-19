import { render } from "@testing-library/react";

import Label from ".";

const testFormFieldId = "testFormFieldId";
const testLabelText = "testLabel";

describe("Label", () => {
  it("should render a label which text matches children", () => {
    const { container } = render(
      <Label formFieldId={testFormFieldId}>{testLabelText}</Label>
    );

    const label = container.querySelector("label");

    expect(label.innerHTML).toBe(testLabelText);
  });

  it("should add '*' to label when prop 'asRequired' is true", () => {
    const { container } = render(
      <Label formFieldId={testFormFieldId} asRequired={true}>
        {testLabelText}
      </Label>
    );

    const label = container.querySelector("label");

    expect(label.innerHTML).toBe(`${testLabelText}*`);
  });

  it("should add attribute 'for' to label which matches prop 'formFieldId'", () => {
    const { container } = render(
      <Label formFieldId={testFormFieldId}>{testLabelText}</Label>
    );

    const label = container.querySelector("label");

    expect(label.getAttribute("for")).toBe(testFormFieldId);
  });
});
