import axios from "axios";

/**
 * All requests go to /api/* so the Vite dev proxy forwards them to the hosted
 * API (see server.proxy in vite.config.ts). Same-origin from the browser's
 * point of view, so no CORS preflight to fight with.
 */
const api = axios.create({
    baseURL: "/api",
    timeout: 15000,
});

const API_KEY = import.meta.env.VITE_API_KEY;

api.interceptors.request.use((config) => {
    if (API_KEY) {
        // If the API wants a different scheme, this is the one line to change:
        //   config.headers.set("x-api-key", API_KEY);
        //   config.headers.set("Authorization", API_KEY);
        config.headers.set("Authorization", `Bearer ${API_KEY}`);
    }
    return config;
});

export default api;
