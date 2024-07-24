import { WeatherDisplayProps } from "../types/component";

const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold mb-2">
        Current Weather in {weather.name}
      </h2>
      <p className="text-xl">{weather.weather[0].description}</p>
      <p className="text-3xl font-bold">{weather.main.temp}°C</p>
    </div>
  );
};

export default WeatherDisplay;
