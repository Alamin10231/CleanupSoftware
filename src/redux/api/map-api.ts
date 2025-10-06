import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mapApi = createApi({
   reducerPath: "mapApi",
   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
   tagTypes: ["Map"],
   endpoints: (builder) => ({
      getMap: builder.query({
         query: () => `/map`,
         providesTags: ["Map"],
      })
   })
})
