import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const savedWeather = await prisma.weather.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(savedWeather);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch saved weather data" },
      { status: 500 }
    );
  }
}
