import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;

    // Get the coordinates for the entered city
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: city,
          limit: 1,
          appid: apiKey,
        },
      }
    );

    if (geoResponse.data.length === 0) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { lat, lon } = geoResponse.data[0];
    return NextResponse.json({ lat, lon });
  } catch (error) {
    console.error("Error fetching coordinates for the city", error);
    return NextResponse.json(
      { error: "Failed to fetch coordinates" },
      { status: 500 }
    );
  }
}
