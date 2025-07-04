import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatAppAPI = createApi({
    reducerPath: "chatAppAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/",
        headers: { "Content-Type": "application/json" },
    }),
    endpoints: () => ({}),
    tagTypes: ["messages"]
});
