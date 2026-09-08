# Flight Status Dashboard

## Overview

FlightFlow is a web application that shows live updates for flight statuses.

The app displays:

- Flight status updates
- Gate information
- Highlighted schedule changes

It also includes Profile Settings (accessible from the header avatar) with:

- Persistent theme switching (`Light`, `Dark`, `System`)
- Localized time formatting for:
  - UK
  - US
  - Australia

## Setup

### Environment variables

Create a `.env.local` file in the project root:

```
VITE_FLIGHT_API_TOKEN=your_token_here
```

Ask the interviewer for the bearer token.

### Install & run

```bash
pnpm install
pnpm dev
```

## API Reference

The application uses the Flight Status API.

All endpoints are authenticated and require the following header:

```http
Authorization: Bearer XXXXX
```

### Flight Events

`GET https://dv7wjygdbi.execute-api.eu-west-1.amazonaws.com/events?flightId=AA123`

#### Query parameters

- `flightId` (string, required): The flight identifier. Valid value: `AA123`

#### Response schema

```json
[
  {
    "flightNumber": "AA123",
    "status": "OnTime | Delayed",
    "originalDepartureDatetime": "2024-10-03T15:00:00Z",
    "newDepartureDatetime": "2024-10-03T16:30:00Z",
    "gate": "D4",
    "updateDatetime": "2024-10-03T12:00:00Z"
  }
]
```

### Flight ID Autocomplete

`GET /api/flights/autocomplete?chars=<query>`

#### Query parameters

- `chars` (string, required): The query string for autocomplete

#### Response schema

```json
{
  "flightNumbers": ["AA123", "AC190", "AC291", "AF120", "AF221", "AS165"]
}
```
