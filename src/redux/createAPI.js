import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatAppAPI = createApi({
    reducerPath: "chatAppAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://incandescent-quokka-1e99ee.netlify.app/api/",
        headers: { "Content-Type": "application/json" },
    }),
    endpoints: () => ({}),
    tagTypes: ["messages"]
});
