import React from "react";
import { render } from "react-testing-library";
import TextCentered from "../../components/TextCentered";

describe("TextCentered", () => {
  it("renders its children", () => {
    render(<TextCentered>Hello World</TextCentered>).getByText("Hello World");
  });
});
