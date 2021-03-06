import React from "react";
import { render } from "react-testing-library";
import Temperature from "../../components/Temperature";

describe("Temperature", () => {
  it("should display the temperature as a rounded number", () => {
    render(<Temperature value={50.6} />).getByText("51", { exact: false });
    render(<Temperature value={50.44} />).getByText("50", { exact: false });
  });

  it("should display a ˚ sign", () => {
    render(<Temperature value={32} />).getByText("32˚");
  });
});
