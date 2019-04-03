import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DailyForecast, { Props } from "../../components/DailyForecast";
import { moonPhaseClassName } from "../../components/MoonPhase";

afterEach(cleanup);

const props: Props = {
  time: 1547798400, // 'Friday, January 18, 2019'
  summary: "It's raining cats and dogs",
  icon: "rain",

  temperatureLow: 50,
  temperatureHigh: 65,

  sunriseTime: 1547998917,
  sunsetTime: 1548032824,
  moonPhase: 0.52,

  precipProbability: 0.5,
  precipIntensity: 0.0417,
  precipType: "rain",

  windSpeed: 5,
  windBearing: 45,
  cloudCover: 0.9,

  dewPoint: 60,
  humidity: 0.9,
  pressure: 100,

  uvIndex: 1,
  visibility: 5,
};

describe("DailyForecast", () => {
  describe("When loading", () => {
    /**
     * TODO
     * update tests for loading state
     */
    // it("should display a 🌈", () => {
    //   render(<DailyForecast />).getByText("🌈");
    // });
  });

  describe("When passed in loaded props", () => {
    it("should display a summary of conditions", () => {
      render(<DailyForecast {...props} />).getByText(props.summary);
    });

    it("should display a weather icon", () => {
      const { getByRole } = render(<DailyForecast {...props} />);
      expect(getByRole("img").className).toEqual("wi wi-forecast-io-rain");
    });

    it("should display cloud cover as a percentage", () => {
      render(<DailyForecast {...props} cloudCover={0.5} />).getByText("50%");
    });

    it("renders the dew point as a temperature", () => {
      render(<DailyForecast {...props} />).getByText("60˚");
    });

    it("renders humidity as a percentage", () => {
      render(<DailyForecast {...props} />).getByText("90%");
    });

    it("renders pressure as mb", () => {
      render(<DailyForecast {...props} />).getByText("100mb");
    });

    it("displays UV Index", () => {
      render(<DailyForecast {...props} />).getByText("UV 1");
    });

    describe("visibility", () => {
      it("renders visibility in miles", () => {
        render(<DailyForecast {...props} />).getByText("5 miles");
      });

      it("displays > 10 miles if value is === 10", () => {
        render(<DailyForecast {...props} visibility={10} />).getByText(
          "> 10 miles",
        );
      });

      it("displays > 10 miles if value is > 10 miles", () => {
        render(<DailyForecast {...props} visibility={100} />).getByText(
          "> 10 miles",
        );
      });
    });

    describe("sunrise / sunset", () => {
      it("should display the sunrise time", () => {
        render(<DailyForecast {...props} sunriseTime={1548085273} />).getByText(
          "7:41 AM",
        );
      });

      it("should display the sunrise icon", () => {
        const { getByTitle } = render(<DailyForecast {...props} />);
        getByTitle("sunrise");
      });

      it("should display the sunset time", () => {
        render(<DailyForecast {...props} sunsetTime={1548119303} />).getByText(
          "5:08 PM",
        );
      });

      it("should display the sunset icon", () => {
        const { getByTitle } = render(<DailyForecast {...props} />);
        getByTitle("sunset");
      });
    });

    describe("temperatures", () => {
      it("should display the high temperature", () => {
        render(<DailyForecast {...props} />).getByText("65˚");
      });

      it("should display the low temperature", () => {
        render(<DailyForecast {...props} />).getByText("50˚");
      });
    });

    describe("Precipitation", () => {
      it('should display the text "No Precipitation" when precipProbability is 0', () => {
        render(<DailyForecast {...props} precipProbability={0} />).getByText(
          "No Precipitation",
        );
      });

      it("should display % chance of precipitation if precipProbability > 0", () => {
        render(<DailyForecast {...props} precipProbability={0.4} />).getByText(
          "40%",
        );
      });

      it("should display a 100% chance of precipitation if precipProbability is 1", () => {
        render(<DailyForecast {...props} precipProbability={1} />).getByText(
          "100%",
        );
      });

      it("should display amount of precipitation in inches", () => {
        render(
          <DailyForecast {...props} precipIntensity={1.0 / 24} />,
        ).getByText("Chance of Rain, 1.00 in");
      });

      it("should display correct precipitation type", () => {
        render(
          <DailyForecast
            {...props}
            precipIntensity={0.5 / 24.0}
            precipType="snow"
          />,
        ).getByText("Chance of Snow, 0.50 in");
      });
    });

    describe("Moon Phase", () => {
      it("displays the correct icon", () => {
        const { getByTitle } = render(
          <DailyForecast {...props} moonPhase={0.5} />,
        );
        expect(getByTitle("Full Moon").className).toEqual(
          moonPhaseClassName(0.5),
        );
      });

      it("displays the name of the moon phase", () => {
        render(<DailyForecast {...props} moonPhase={0.74} />).getByText(
          "Waning Gibbous",
        );
      });
    });

    describe("Wind", () => {
      it("displays the Wind field", () => {
        render(<DailyForecast {...props} />).getByText("Wind");
      });

      it("outputs wind speed as mph", () => {
        render(<DailyForecast {...props} windSpeed={3} />).getByText("3mph");
      });

      it("outputs a rotated arrow to indicate wind bearing", () => {
        render(<DailyForecast {...props} />).getByTestId("rotated-span-45");
      });
    });
  });
});
