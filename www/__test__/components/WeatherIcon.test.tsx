import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import WeatherIcon from "../../components/WeatherIcon";

afterEach(cleanup);

describe("WeatherIcon", () => {
  it("outputs the correct role attribute of img", () => {
    render(<WeatherIcon name="clear-day" />).getByRole("img");
  });

  it("outputs a title attribute", () => {
    render(<WeatherIcon name="clear-day" />).getByTitle("clear-day");
  });

  it("renders an i tag", () => {
    const el = render(<WeatherIcon name="clear-day" />).getByTitle("clear-day");
    expect(el.tagName).toEqual("I");
  });

  it("outputs the correct classNames", () => {
    const { getByTitle } = render(<WeatherIcon name="clear-day" />);
    const { className } = getByTitle("clear-day");
    expect(className).toEqual("wi wi-forecast-io-clear-day");
  });

  it("outputs correct html", () => {
    const { getByRole } = render(<WeatherIcon name="rain" />);
    expect(getByRole("img")).toMatchSnapshot();
  });
});
