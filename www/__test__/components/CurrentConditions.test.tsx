import React from "react";
import { render } from "react-testing-library";
import CurrentConditions from "../../components/CurrentConditions";
import forecastData from "../forecastData";

const props = {
  forecastSummary:
    "Light rain tomorrow through Monday, with high temperatures falling to 40°F on Monday.",
  conditions: forecastData().currently,
};

function renderCurrentConditions() {
  return render(<CurrentConditions {...props} />);
}

describe("CurrentConditions", () => {
  it("renders the forecast summary for the next few days", () => {
    renderCurrentConditions().getByText(props.forecastSummary);
  });

  it("renders a weather summary and shows apparent temperature", () => {
    const txt = props.conditions.summary + ", feels like";
    const container = renderCurrentConditions().getByText(txt);
    expect((container.firstElementChild as Element).textContent).toEqual("41˚");
  });

  it("renders the appropriate icon", () => {
    const { getByRole } = renderCurrentConditions();
    expect(getByRole("img").className).toEqual("wi wi-forecast-io-rain");
  });

  it("gives the temperature as a round number", () => {
    const { getByTestId } = renderCurrentConditions();
    expect(getByTestId("test-temp").textContent).toEqual(" 43˚");
  });
});
