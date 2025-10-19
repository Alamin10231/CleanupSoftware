import { baseApi } from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchAllEmpoloyees: builder.query({
      query: (searchEmployee = "") => `employees/?search=${searchEmployee}`,
      providesTags: ["SearchEmployees"],
    }),
    addEmployee: builder.mutation({
      query: (add_employee) => ({
        url: "/employees/",
        method: "POST",
        body: add_employee,
      }),
      invalidatesTags: ["AddEmployee"],
    }),
    employeeOverview: builder.query<any, void>({
      query: () => "/overview/",
      providesTags: ["AdminEmployeeOverview"],
    }),
    getAllemployeeAdmin: builder.query<any, number | void>({
      query: (page = 1) => `employees/?page=${page}`,
      providesTags: ["GetAllEmployeeAdmin"],
    }),
  }),
});

export const {
  useGetSearchAllEmpoloyeesQuery,
  useAddEmployeeMutation,
  useEmployeeOverviewQuery,
  useGetAllemployeeAdminQuery,
} = usersApi;
