// all directions set true north at 0° and progress clockwise
// all percentages range from 0 to 1
// dates / times are unix time in seconds
// temperatures are in fahrenheit

export interface ForecastAPICommon {
  time: number;
  summary: string;
  icon: string;
  precipIntensity: number; // inches per hour
  precipProbability: number; // percentage
  dewPoint: number; // degrees fahrenheit
  humidity: number; // percentage
  pressure: number; // millibars
  windSpeed: number; // mph
  windGust: number;
  windBearing: number; // direction 0->360
  cloudCover: number; // percentage
  uvIndex: number; // 0 to 12
  visibility: number; // 0 to 10 in miles
  ozone: number;
}

export interface ForecastAPICurrently extends ForecastAPICommon {
  nearestStormDistance: number;
  precipIntensityError: number; // inches per hour
  precipType?: string; // rain/snow/etc
  temperature: number; // fahrenheit
  apparentTemperature: number; // fahrenheit
}

export interface ForecastAPIMinutely {
  summary: string;
  icon: string;
  data: {
    time: number;
    precipIntensity: number; // inches per hour
    precipIntensityError: number; // inches per hour
    precipProbability: number; // percentage
    precipType?: string; // rain/snow/etc
  }[];
}

export interface ForecastAPIHourlyData extends ForecastAPICommon {
  temperature: number; // fahrenheit
  apparentTemperature: number; // fahrenheit
  precipType?: string; // rain/snow/etc
}

export interface ForecastAPIHourly {
  summary: string;
  icon: string;
  data: ForecastAPIHourlyData[];
}

export interface ForecastAPIDailyData extends ForecastAPICommon {
  precipType?: string;
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  windGustTime: number;
  uvIndexTime: number;
  temperatureMin: number;
  temperatureMinTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
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
    "darksky-unavailable"?: boolean;
  };

  currently: ForecastAPICurrently;
  minutely: ForecastAPIMinutely;
  hourly: ForecastAPIHourly;
  daily: ForecastAPIDaily;
}
