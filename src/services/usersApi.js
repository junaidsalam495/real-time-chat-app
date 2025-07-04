import { chatAppAPI } from "@/redux/createAPI";

const usersApi = chatAppAPI.injectEndpoints({
    endpoints: (build) => ({
        getUsersApi: build.query({
            query: () => `users`,
        }),
    }),
});

export const { useGetUsersApiQuery } = usersApi;
