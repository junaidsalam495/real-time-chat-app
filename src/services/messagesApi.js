import { chatAppAPI } from "@/redux/createAPI";

const messagesApi = chatAppAPI.injectEndpoints({
    endpoints: (build) => ({
        messages: build.mutation({
            query: ({ senderId, receiverId, text }) => ({
                url: `messages`,
                method: "POST",
                body: { senderId, receiverId, text },
            }),
            invalidatesTags: ['messages']
        }),
        getMessages: build.query({
            query: ({ senderId, receiverId }) => ({
                url: `messages?senderId=${senderId}&receiverId=${receiverId}`,
                method: "GET",
            }),
            providesTags: ['messages']
        }),
    }),
});

export const {
    useMessagesMutation,
    useGetMessagesQuery,
} = messagesApi;
