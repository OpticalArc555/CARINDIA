import { apiSlice } from "./apiSlice";

export const carApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filterCar: builder.query({
      query: (urlState) => {
        console.log(urlState);
        return {
          url: `/cars/mainFilter?minPrice=&maxPrice=&area=&year=&brand=&model=&transmission=&fuel_type= `,
          method: "GET",
        };
      },
      providesTags: ["CAR"],
    }),
    getCarById: builder.query({
      query: (carId) => ({
        url: `/cars/getCar?carId=${carId}`,

        method: "GET",
      }),
      providesTags: ["CAR"],
    }),
    dealerIdByCar: builder.query({
      query: ({ id, pageNo }) => ({
        url: `/car/dealer?dealerId=${id}&carStatus=ACTIVE&pageNo=${pageNo}`,
        method: "GET",
        transferResponse: console.log(id, pageNo),
      }),
      providesTags: ["CAR", "Dealer"],
    }),
    getAllCar: builder.query({
      query: () => ({
        url: `/cars/mainFilter/${0}`,
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),
    bookingRequest: builder.mutation({
      query: (formData) => ({
        transferResponse: console.log(formData),
        url: `/booking/request`,

        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CAR"],
    }),
    carRegister: builder.mutation({
      query: (data) => ({
        url: `/car/carregister`,

        transferResponse: console.log(data),
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["CAR"],
    }),
    carUpdate: builder.mutation({
      query: ({ data, carId }) => ({
        url: `/car/edit/${carId}`,
        transferResponse: console.log(data, carId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CAR"],
    }),
    carRemove: builder.mutation({
      query: ({id,carId}) => ({
        url: `/car/removeCar?carId=${carId}&dealerId=${id}`,
        transferResponse:console.log(id,carId),
        method:'DELETE'
      }),
      invalidatesTags: ["CAR"],
    }),
    userAllCarRequest: builder.query({
      query: ({ page, userid }) => ({
        url: `/booking/getByUserId?pageNo=${1}&userId=${userid}`,
        transferResponse: console.log(page, userid),
      }),
      providesTags: ["CAR"],
    }),
    getAllUserConfirm: builder.query({
      query: () => ({
        url: `/confirmBooking/getAllBookingsByUserId?userId=1012`,
      }),
      providesTags: ["CAR"],
    }),

    ConfirmBooking: builder.query({
      query: () => ({
        url: `/confirmBooking/book`,
        method : "POST"
      }),
      providesTags: ["CAR"],
    }),

    getPendingrequest : builder.query({
      query : ({CarId,currentpage}) => ({
        url : `/booking/getPendingBookingDetailsByCarID?pageNo=${currentpage}&CarId=${CarId}`,
        method : 'GET',
        
      }),
      providesTags : ["CAR"],
    }),

    getCarImageById : builder.query({
      query : ({carId}) =>({
        url: `/uploadFile/getByCarID?carId=${carId} `,
        transferResponse: console.log(carId),
        method : 'GET'
      }),
      providesTags : ["CAR"],
    })

    // getCarImageById : builder.query({
    //   query : ({carId}) => ({
    //     url : `/photo/get/${carId}`,
    //     method : 'GET',
    //     transferResponse: console.log(carId),
    //     responseHandler: (response) => {
    //       // Check response headers (e.g., Content-Type) to determine format
    //       if (response.headers.get('Content-Type').startsWith('image/')) {
    //         return response.blob(); // Assuming response is an image blob
    //       } else {
    //         // Handle unexpected formats (throw error or return default value)
    //         throw new Error('Unexpected response format');
    //       }
    //     }
    //   }),
    //   providesTags : ["CAR"],
    // })
  }),
});

export const {
  useFilterCarQuery,
  useGetCarByIdQuery,
  useGetAllCarQuery,
  useDealerIdByCarQuery,
  useBookingRequestMutation,
  useCarRegisterMutation,
  useCarUpdateMutation,
  useCarRemoveMutation,
  useUserAllCarRequestQuery,
  useGetAllUserConfirmQuery,
  useGetPendingrequestQuery,
  useGetCarImageByIdQuery,
  useConfirmBookingQuery
} = carApi;
