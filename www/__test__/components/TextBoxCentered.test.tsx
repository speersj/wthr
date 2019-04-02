import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import TextBoxCentered from "../../components/TextBoxCentered";

afterEach(cleanup);

describe("TextBoxCentered", () => {
  it("renders its children", () => {
    render(<TextBoxCentered>Hello World</TextBoxCentered>).getByText(
      "Hello World",
    );
  });
});
