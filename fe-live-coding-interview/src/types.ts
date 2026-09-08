export type FlightStatus = "OnTime" | "Delayed";

export interface FlightEvent {
  flightNumber: string;
  status: FlightStatus;
  originalDepartureDatetime: string;
  newDepartureDatetime: string;
  gate: string;
  updateDatetime: string;
}
