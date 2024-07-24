"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import WeatherDisplay from "../components/WeatherDisplay";
import HourlyForecast from "../components/HourlyForecast";
import { WeatherResponse, HourlyWeatherData } from "../types/weather";
import { GeocodeResponse } from "../types/geocode";

export default function Home() {
  const [location, setLocation] = useState<{
    lat: number | null;
    lon: number | null;
  }>({ lat: null, lon: null });
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<{
    current: WeatherResponse;
    hourly: HourlyWeatherData[];
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation not supported or permission denied", error);
      }
    );
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`/api/weather`, {
        params: { lat, lon },
      });
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCitySubmit = async () => {
    try {
      const geoResponse = await axios.get<GeocodeResponse>(`/api/geocode`, {
        params: { city },
      });
      const { lat, lon } = geoResponse.data;
      setLocation({ lat, lon });
      fetchWeather(lat, lon);
    } catch (error) {
      console.error("Error fetching coordinates for the city", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCitySubmit();
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Weather App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city"
          className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm"
        />
        <button
          onClick={handleCitySubmit}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Get Weather
        </button>
      </div>
      {weather && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
          <WeatherDisplay weather={weather.current} />
          <HourlyForecast forecast={weather.hourly} />
        </div>
      )}
    </div>
  );
}
