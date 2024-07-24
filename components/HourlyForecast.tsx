import { HourlyForecastProps } from "../types/component";

const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        8-Hour Forecast
      </h2>
      <div className="flex flex-col space-y-4">
        {forecast.map((hour, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow-md"
          >
            <p className="flex-1 font-semibold">
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="flex-2 text-lg text-center">{hour.main.temp}°C</p>
            <p className="flex-1 text-sm text-gray-600 text-right">
              {hour.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
