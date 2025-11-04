import { baseApi } from "@/redux/api/baseApi";

export const ChatHistory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatHistory: builder.query<any, void>({
      query: () => `chat/connected-users/`,
    //   providesTags: ["ExpenseCategory"],
    })

  }),
});

export const {
  useGetChatHistoryQuery,
} = ChatHistory;
