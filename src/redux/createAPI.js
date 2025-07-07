import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatAppAPI = createApi({
    reducerPath: "chatAppAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://real-time-chat-app-production-dc88.up.railway.app/api/",
        headers: { "Content-Type": "application/json" },
    }),
    endpoints: () => ({}),
    tagTypes: ["messages"]
});
