import type { FlightEvent } from "../../types";
import { FlightEventCard } from "../FlightEventCard/FlightEventCard";
import styles from "./EventHistory.module.css";

interface EventHistoryProps {
  events: FlightEvent[];
}

export function EventHistory({ events }: EventHistoryProps) {
  return (
    <section className={styles.section}>
      {events.length > 1 && <h2 className={styles.heading}>Event History</h2>}
      {events.map((event, index) => (
        <FlightEventCard
          key={`${event.flightNumber}-${event.updateDatetime}`}
          event={event}
          isLatest={index === 0}
        />
      ))}
    </section>
  );
}
