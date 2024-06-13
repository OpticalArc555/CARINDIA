import { apiSlice } from "./apiSlice";

export const inspectorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    inspectorById: builder.query({
      query: () => ({
        url: `/ispProfile/inspector?inspectorProfileId=3`,
        method: "GET",
      }),
       // You probably want providesTags here instead of invalidatesTags for queries
    }),

    getallInspector: builder.query({
      query: () => ({
        url: `/ispProfile/GetAllInspProfiles?pageNo=0&pageSize=10`,
        method: "GET",
      }),
       // Same here
    }),
  }),
});

export const { useInspectorByIdQuery , useGetallInspectorQuery} = inspectorAPI;
