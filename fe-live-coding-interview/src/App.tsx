import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { FlightEvent } from "./types";
import { fetchFlightEvents } from "./api";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { EventHistory } from "./components/EventHistory/EventHistory";
import { Avatar } from "./components/Avatar/Avatar";
import { UserProfilePanel } from "./components/UserProfilePanel/UserProfilePanel";
import { UserProfileProvider } from "./context/UserProfileContext";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import styles from "./App.module.css";

function AppContent() {
  const [flightId, setFlightId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    data: flightEvents,
    isLoading,
    error,
  } = useQuery<FlightEvent[]>({
    queryKey: ["flightEvents", flightId],
    queryFn: () => fetchFlightEvents(flightId!),
    enabled: !!flightId,
    select: (data) =>
      [...data].sort(
        (a, b) =>
          new Date(b.updateDatetime).getTime() -
          new Date(a.updateDatetime).getTime(),
      ),
    retry: (_failureCount, error) => {
      if (error instanceof Error && error.message.includes("404")) {
        return false;
      }
      return true;
    },
  });

  const latestEvent = flightEvents?.[0];
  useDocumentTitle(
    latestEvent
      ? `${latestEvent.flightNumber} - ${latestEvent.status} | Flight Status`
      : "FlightFlow | Your Flight Status Dashboard",
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>FlightFlow</h1>
          <p className={styles.subtitle}>Your Flight Status Dashboard</p>
        </div>
        <Avatar onClick={() => setProfileOpen(true)} />
      </div>
      <SearchBar
        onSearch={setFlightId}
        onClear={() => setFlightId(null)}
        isLoading={isLoading}
        focusWhenReady={!!flightEvents?.length}
      />
      {isLoading && <p className={styles.loading}>Loading…</p>}
      {error && (
        <p className={styles.error}>
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}
      {flightId && !isLoading && !error && !flightEvents?.length && (
        <p>No events found.</p>
      )}
      {flightEvents?.length && <EventHistory events={flightEvents} />}
      {profileOpen && (
        <UserProfilePanel onClose={() => setProfileOpen(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <UserProfileProvider>
      <AppContent />
    </UserProfileProvider>
  );
}

export default App;
