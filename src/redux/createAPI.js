import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatAppAPI = createApi({
    reducerPath: "chatAppAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://real-time-chat-app-eight-sooty.vercel.app/api/",
        headers: { "Content-Type": "application/json" },
    }),
    endpoints: () => ({}),
    tagTypes: ["messages"]
});
