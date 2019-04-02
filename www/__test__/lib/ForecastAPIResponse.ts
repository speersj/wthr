export interface ForecastAPICommon {
  time: number;
  summary: string;
  icon: string;
  precipIntensity: number;
  precipProbability: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}

export interface ForecastAPICurrently extends ForecastAPICommon {
  nearestStormDistance: number;
  precipIntensityError: number;
  precipType: string;
  temperature: number;
  apparentTemperature: number;
}

export interface ForecastAPIMinutely {
  summary: string;
  icon: string;
  data: {
    time: number;
    precipIntensity: number;
    precipIntensityError: number;
    precipProbability: number;
    precipType: string;
  }[];
}

export interface ForecastAPIHourly {
  summary: string;
  icon: string;
  data: ForecastAPICurrently[];
}

export interface ForecastAPIDailyData extends ForecastAPICurrently {
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
}

export interface ForecastAPIDaily {
  summary: string;
  icon: string;
  data: ForecastAPIDailyData[];
}

export interface ForecastAPIResponse {
  latitude?: number;
  longitude?: number;
  offset?: number;
  timezone?: string;

  flags?: {
    sources: string[];
    "nearest-station": number;
    units: string;
  };

  currently?: ForecastAPICurrently;
  minutely?: ForecastAPIMinutely;
  daily?: ForecastAPIDaily;
}
