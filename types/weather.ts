export interface WeatherCondition {
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherResponse {
  weather: WeatherCondition[];
  main: MainWeatherData;
  name: string; // City name
}

export interface HourlyWeatherData {
  dt: number; // Timestamp
  main: {
    temp: number;
  };
  weather: WeatherCondition[];
}

export interface HourlyForecastResponse {
  list: HourlyWeatherData[];
}
