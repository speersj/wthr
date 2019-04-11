// import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import Location from "../../components/Location";
// import LocationContainer from "../../containers/LocationContainer";

afterEach(cleanup);

// const host = "http://localhost:3000";

describe("Location", () => {
  it("is defined", () => {
    expect(Location).toBeDefined();
  });
  // it("displays a loading element if location is not ready", () => {
  //   const load = () => Promise.resolve();
  //   const container = new LocationContainer();
  //   container.load = load;
  //   const { getByTestId } = render(
  //     <Location host={host} container={container} />,
  //   );
  //   getByTestId("loading-location");
  // });

  // it("calls the container's load function to retrieve location / weather", () => {
  //   const load = jest.fn();
  //   const container = new LocationContainer();
  //   container.load = load;
  //   render(<Location host={host} container={container} />);
  //   expect(load).toHaveBeenCalled();
  // });
});
