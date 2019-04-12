import React from "react";
import { render } from "react-testing-library";
import TextSmall from "../../components/TextSmall";

describe("TextSmall", () => {
  it("renders its children", () => {
    render(<TextSmall>Hello World</TextSmall>).getByText("Hello World");
  });
});
