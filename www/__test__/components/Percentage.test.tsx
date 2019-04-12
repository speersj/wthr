import React from "react";
import { render } from "react-testing-library";
import Percentage from "../../components/Percentage";

describe("Percentage", () => {
  it("should round ", () => {
    render(<Percentage value={0.436} />).getByText("44%");
  });
});
