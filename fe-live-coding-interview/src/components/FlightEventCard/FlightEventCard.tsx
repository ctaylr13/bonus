import type { FlightEvent } from "../../types";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { useUserProfile } from "../../context/useUserProfile";
import styles from "./FlightEventCard.module.css";

type FlightEventCardProps = {
  event: FlightEvent;
  isLatest?: boolean;
};

export function FlightEventCard({ event, isLatest }: FlightEventCardProps) {
  const { localeConfig } = useUserProfile();

  const fmt = new Intl.DateTimeFormat(localeConfig.locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: localeConfig.timeZone,
  });

  function formatDate(iso: string) {
    return fmt.format(new Date(iso));
  }

  const isTimeChanged =
    event.originalDepartureDatetime !== event.newDepartureDatetime;

  return (
    <article className={`${styles.card} ${isLatest ? styles.latest : ""}`}>
      <div className={styles.updatedAt}>
        Updated at {formatDate(event.updateDatetime)}
      </div>
      <div className={styles.header}>
        <span className={styles.flightNumber}>{event.flightNumber}</span>
        <StatusBadge status={event.status} />
      </div>
      <div className={styles.footer}>
        <span className={styles.gate}>Gate {event.gate}</span>
        <span className={styles.timeChange}>
          {isTimeChanged && (
            <>
              <span className={styles.oldTime}>
                {formatDate(event.originalDepartureDatetime)}
              </span>
              {" → "}
            </>
          )}
          <span className={isTimeChanged ? styles.newTime : undefined}>
            {formatDate(event.newDepartureDatetime)}
          </span>
        </span>
      </div>
    </article>
  );
}
