import type { FlightEvent } from "./types";

const BASE_URL = "/api/events";
const AUTH_TOKEN = import.meta.env.VITE_FLIGHT_API_TOKEN as string;

export async function fetchFlightEvents(
  flightId: string,
): Promise<FlightEvent[]> {
  const url = new URL(BASE_URL, window.location.origin);
  url.searchParams.set("flightId", flightId);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.events;
}
