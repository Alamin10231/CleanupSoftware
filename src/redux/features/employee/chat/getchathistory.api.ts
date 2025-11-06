import { baseApi } from "@/redux/api/baseApi";

export const ChatHistory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatHistory: builder.query<any, void>({
      query: () => `chat/connected-users/`,
      providesTags: ["EmployeConversations"],
    }),

    getChatMessages: builder.query<any, void>({
      query: (target_email) => "chat/load-messages/?page=1&limit=99999999999&friend_email="+target_email,
      // providesTags: 
    })


  }),
});

export const {
  useGetChatHistoryQuery,
  useLazyGetChatMessagesQuery
} = ChatHistory;
