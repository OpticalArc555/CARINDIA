
import { apiSlice } from "./apiSlice";


export const biddingAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    biddingAllCard: builder.query({
      query: () => ({
        url: `/BeadingCarController/all`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    biddingCarByDealerId: builder.query({
      query: (UserID) => ({
        url: `/BeadingCarController/getByUserId1/${UserID}`,
        transferResponse: console.log(UserID),
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    biddingCarById: builder.query({
      query: (carId) => ({
        url: `/BeadingCarController/getbyId/${carId}`,

        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),
    biddingcarUpdate: builder.mutation({
      query: ({ data, carId }) => ({
        url: `/BeadingCarController/edit/${carId}`,
        transferResponse: console.log(data, carId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BIDDING"],
    }),
    biddingRemove: builder.mutation({
      query: (carId) => ({
        url: `/BeadingCarController/delete/${carId}`,
        transferResponse: console.log(carId),
        method: "DELETE",
      }),
      invalidatesTags: ["BIDDING"],
    }),

    biddingCarRegister: builder.mutation({
      query: (formdata) => ({
        url: `/BeadingCarController/carregister`,
        transferResponse: console.log(formdata),
        method: "POST",
        body : formdata
      }),
      invalidatesTags: ["BIDDING"],
    }),

    startBiddingSetTime: builder.mutation({
      query: (settime) => ({
        url: `/Bidding/v1/SetTime`,
        transferResponse: console.log("Data to backend :- ",settime),
        method: "POST",
        body : settime
      }),
      invalidatesTags: ["BIDDING"],
    }),

    createBidding: builder.mutation({
      query: (bidding) => ({
        url: `/Bidding/v1/CreateBidding`,
        transferResponse: console.log("Data to backend :- ",bidding),
        method: "POST",
       body : bidding
      }),
      invalidatesTags: ["BIDDING"],
    }),

    bidCarbyId : builder.query({
      query : () => ({
        url : `/Bidding/v1/getById?bidCarId=3&beadingCarId=22`,
        method : "GET"
      }),
      providesTags: ["BIDDING"],
    }),

  }),
});

export const {useBiddingAllCardQuery,
  useBiddingCarByIdQuery, 
  useBiddingcarUpdateMutation, 
  useBiddingRemoveMutation ,
  useBiddingCarRegisterMutation , 
  useStartBiddingSetTimeMutation ,
  useCreateBiddingMutation, 
  useBidCarbyIdQuery, 
  useBiddingCarByDealerIdQuery } = biddingAPI