/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// import { useNavigate } from 'react-router-dom';

export const apiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cf-production.up.railway.app",
    prepareHeaders: (headers, { getState }) => {
      // console.log(headers, "prepareHeaders");
      // console.log(getState().auth.token);
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User", "Admin", "Dealer", "CAR", "DEALERBOOKING" ,"Inspector","SALESPERSON","Favorite"],
  endpoints: (builder) => ({}),
});


