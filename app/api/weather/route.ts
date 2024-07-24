import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and Longitude are required" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;

    // Get current weather data
    const { data: currentWeatherResponse } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    await prisma.weather.create({
      data: {
        city: currentWeatherResponse.name,
        temperature: currentWeatherResponse.main.temp,
        description: currentWeatherResponse.weather[0].description,
      },
    });

    // Get 8 hour future forecast data
    const {
      data: { list: forecastResponse },
    } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric",
        cnt: 8, // 8 data points for 8 hours
      },
    });

    const data = {
      current: currentWeatherResponse,
      hourly: forecastResponse, // Get the next 8 data points (3-hour intervals)
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
