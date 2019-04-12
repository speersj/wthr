import React from "react";
import { render, fireEvent } from "react-testing-library";
import ForecastThumbnail from "../../components/ForecastThumbnail";
import forecastData from "../forecastData";

const props = {
  ...forecastData().daily.data[0],
  active: false,
  onClick: jest.fn(),
};

describe("ForecastThumbnail", () => {
  it("renders the correct icon", () => {
    const { getByRole } = render(<ForecastThumbnail {...props} />);
    expect(getByRole("img").className).toEqual("wi wi-forecast-io-rain");
  });

  it("renders the high temperature", () => {
    render(<ForecastThumbnail {...props} temperatureHigh={50} />).getByText(
      "50˚",
    );
  });

  it("renders the low temperature", () => {
    render(<ForecastThumbnail {...props} temperatureLow={62} />).getByText(
      "62˚",
    );
  });

  it("renders the day of the week", () => {
    render(<ForecastThumbnail {...props} />).getByText("Fri");
  });

  it("responds to click events", () => {
    const { getByText } = render(<ForecastThumbnail {...props} />);
    fireEvent.click(getByText("Fri"));
    expect(props.onClick).toHaveBeenCalled();
  });
});
