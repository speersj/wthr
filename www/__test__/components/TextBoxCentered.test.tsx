import React from "react";
import { render } from "react-testing-library";
import TextBoxCentered from "../../components/TextBoxCentered";

describe("TextBoxCentered", () => {
  it("renders its children", () => {
    render(<TextBoxCentered>Hello World</TextBoxCentered>).getByText(
      "Hello World",
    );
  });
});
