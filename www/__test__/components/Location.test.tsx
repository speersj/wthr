import React from "react";
import Location from "../../components/Location";
import LocationContainer from "../../containers/LocationContainer";
import { render } from "react-testing-library";

describe("Location", () => {
  it("is defined", () => {
    expect(Location).toBeDefined();
  });

  it("renders the location name", async () => {
    const lc = new LocationContainer();
    await lc.init("hostname");
    await lc.setState({ name: "New York" });
    render(<Location container={lc} />).getByText("New York");
  });
});
