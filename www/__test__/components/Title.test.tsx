import React from "react";
import { render } from "react-testing-library";
import Title from "../../components/Title";

describe("Title", () => {
  it("renders its children", () => {
    render(<Title>TestTitle</Title>).getByText("TestTitle");
  });
});
