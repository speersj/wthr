import React from "react";
import { render } from "react-testing-library";
import TitleBig from "../../components/TitleBig";

describe("TitleBig", () => {
  it("renders its children", () => {
    render(<TitleBig>Hello World</TitleBig>).getByText("Hello World");
  });
});
