import { chatAppAPI } from "@/redux/createAPI";

const authApi = chatAppAPI.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: ({ email, password }) => {
                return {
                    url: `auth/login`,
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                }
            },
        }),
        signUp: build.mutation({
            query: ({ name, email, password }) => {
                return {
                    url: `auth/signup`,
                    method: "POST",
                    body: JSON.stringify({ name, email, password }),
                }
            },
        }),
    }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;



