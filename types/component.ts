import { WeatherResponse, HourlyWeatherData } from "./weather";

export interface WeatherDisplayProps {
  weather: WeatherResponse;
}

export interface HourlyForecastProps {
  forecast: HourlyWeatherData[];
}
