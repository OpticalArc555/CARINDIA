/* eslint-disable no-unused-vars */
import { Favorite } from "@material-ui/icons";
import { apiSlice } from "./apiSlice";

export const carApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filterCar: builder.query({
      query: (urlState) => {
        // Destructure and provide default values
        const {
          MinPrice = "",
          MaxPrice = "",
          Area = "",
          Year = "",
          Brand = "",
          Model = "",
          Transmission = "",
          FuleType = "",
        } = urlState || {};
        console.log(urlState);
        return {
          url: `/cars/mainFilter?minPrice=${MinPrice}&maxPrice=${MaxPrice}&area=${Area}&year=${Year}&brand=${Brand}&model=${Model}&transmission=${Transmission}&fuelType=${FuleType}`,
          method: "GET",
        };
      },
      providesTags: ["CAR", "INSPECTOR"],
    }),
    getCarById: builder.query({
      query: (carId) => ({
        url: `/cars/getCar?carId=${carId}`,
        transferResponse: console.log(carId),
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),
    dealerIdByCar: builder.query({
      query: ({ id, pageNo ,status }) => ({
        url: `/car/dealer?dealerId=${id}&carStatus=${status}&pageNo=${pageNo}`,
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
      providesTags: ["CAR", "Inspector"],
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
      query: ({ id, carId }) => ({
        url: `/car/removeCar?carId=${carId}&dealerId=${id}`,
        transferResponse: console.log(id, carId),
        method: "DELETE",
      }),
      invalidatesTags: ["CAR"],
    }),
    userAllCarRequest: builder.query({
      query: ({ pageNo, userid }) => ({
        url: `/booking/getByUserId?pageNo=${pageNo}&userId=${userid}`,
        transferResponse: console.log(pageNo, userid),
      }),
      providesTags: ["CAR"],
    }),
    getAllUserConfirm: builder.query({
      query: () => ({
        url: `/confirmBooking/getAllBookingsByUserId?userId=1012`,
      }),
      providesTags: ["CAR"],
    }),

    ConfirmBooking: builder.mutation({
      query: (formdata) => ({
        url: `/confirmBooking/book`,
        transferResponse: console.log(formdata),
        method: "POST",
        body: formdata,
      }),
      providesTags: ["CAR"],
    }),

    getPendingrequest: builder.query({
      query: ({ CarId, currentpage }) => ({
        url: `/booking/getPendingBookingDetailsByCarID?pageNo=${currentpage}&CarId=${CarId}`,
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    getCarImageById: builder.query({
      query: ({ carId }) => ({
        url: `/uploadFile/getByCarID?carId=${carId} `,
        transferResponse: console.log(carId),
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    deleteCarImageById: builder.mutation({
      query: ({ id }) => ({
        url: `uploadFile/deleteDocumentId?DocumentId=${id}`,
        transferResponse: console.log(id),
        method: `DELETE`,
      }),
      invalidatesTags: ["CAR"],
    }),

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

    favoriteCar: builder.mutation({
      query: (data2) => ({
        url: `/saveCar/add`,
        transferResponse: console.log(data2),
        method : "POST",
        body :data2
      }),
      providesTags: ["CAR"],
    }),

    getbySaveCarId : builder.query({
      query : (saveCarIds) =>({
        url: `/saveCar/getBySaveCar?saveCarId=${saveCarIds}`,
        transferResponse: console.log("saveCarId",saveCarIds),
        method : 'GET'
      }),
      providesTags : ["CAR"],
    }),

    getbyUserCarId : builder.query({
      query : ({UserId}) =>({
        url: `/saveCar/GetByUser?userId=${UserId}`,
        transferResponse: console.log("userId",UserId),
        method : 'GET'
      }),
      providesTags : ["CAR"],
    }),

    CarremoveFavorite: builder.mutation({
      query: ({saveCarId}) => ({
        url: `/saveCar/delete?saveCarId=${saveCarId}`,
        transferResponse:console.log(saveCarId),
        method:'DELETE'
      }),
      invalidatesTags: ["CAR"],
    }),

    CarFavoriteAddRemove: builder.query({
      query: ({carid,useid}) => ({
        url: `/saveCar/getByCarAndUserId?userId=${useid}&carId=${carid}`,
        transferResponse:console.log(carid,useid),
        method:'GET'
      }),
      invalidatesTags: ["CAR"],
    }),

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
  useConfirmBookingMutation,
  useDeleteCarImageByIdMutation,
  useFavoriteCarMutation,
  useGetbySaveCarIdQuery,
  useGetbyUserCarIdQuery,
  useCarremoveFavoriteMutation,
  useCarFavoriteAddRemoveQuery
} = carApi;
