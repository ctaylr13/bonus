import type { FlightStatus } from "../../types";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: FlightStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`${styles.badge} ${
        status === "OnTime" ? styles.onTime : styles.delayed
      }`}
    >
      {status === "OnTime" ? "On Time" : "Delayed"}
    </span>
  );
}
