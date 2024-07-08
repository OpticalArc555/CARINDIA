import { apiSlice } from "./apiSlice";

export const salesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeller: builder.query({
      query: ({pageNo,pageSize}) => ({
        url: `/salesPerson/GetAllInspProfiles?pageNo=${pageNo}&pageSize=${pageSize}`,
        transferResponce: console.log(pageNo),
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "SALESPERSON", pageNo: result.pageNo }] : [],
    }),
    deleteSeller: builder.mutation({
      query: (id) => ({
        url: `/salesPerson/deletById/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SALESPERSON"],
    }),
    sellerById: builder.query({
      query: ({userId}) => ({
        url: `/salesPerson/getByUserId?userId=${userId}`,
        transerResponse: console.log(userId),
        method:"GET"
      }),
      providesTags: ["SALESPERSON"],
    }),
    sellerupdate: builder.mutation({
      query: ({id, salesdata}) => ({
        url: `/salesPerson/updateSPersonDetails?salesPersonId=${id}`,
        method: "PATCH",
        transerResponse: console.log("API response",salesdata,id),
        body: salesdata,
      }),
      invalidatesTags: ["SALESPERSON"],
    }),
  }),
});

export const {
  useGetAllSellerQuery,
  useDeleteSellerMutation,
  useSellerByIdQuery,
  useSellerupdateMutation
} = salesAPI;
