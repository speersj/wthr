import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import Percentage from "../../components/Percentage";

afterEach(cleanup);

describe("Percentage", () => {
  it("should round ", () => {
    render(<Percentage value={0.436} />).getByText("44%");
  });
});
