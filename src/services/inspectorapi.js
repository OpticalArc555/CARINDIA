

import { apiSlice } from "./apiSlice";


export const inspectorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    inspectorById: builder.query({
      query: () => ({
        url: `/ispProfile/inspector?inspectorProfileId=3`,
        method: "GET",
      }),
   
    })

   
  }),
});

export const {useInspectorByIdQuery} = inspectorAPI