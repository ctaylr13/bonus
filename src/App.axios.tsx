import { useEffect, useState } from "react";
import axios from "axios";
import api from "./api/client";
import Scoreboard from "./scoreboard/Scoreboard";
import type { Game, ScheduleResponse } from "./scoreboard/types";

// Proxied version. Requests go to /api/* and vite.config.ts forwards them to
// VITE_API_TARGET, so the browser never makes a cross-origin request.
// To use this instead: in main.tsx, import App from "./App.axios.tsx".
const App = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                // axios parses JSON and throws on 4xx/5xx for you.
                const response = await api.get<ScheduleResponse>("/v1/schedule", {
                    params: { sportId: 1 },
                });
                if (cancelled) return;

                const day = response.data.dates[0];
                setGames(day?.games ?? []);
                setDate(day?.date ?? "");
            } catch (caught) {
                if (cancelled) return;
                setError(
                    axios.isAxiosError(caught)
                        ? `${caught.message}${caught.response ? ` (HTTP ${caught.response.status})` : ""}`
                        : String(caught)
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        void load();
        return () => {
            cancelled = true;
        };
    }, []);

    return <Scoreboard games={games} date={date} loading={loading} error={error} />;
};

export default App;
