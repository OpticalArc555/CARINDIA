import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/jwt/login",
        method: "POST",
        transformResponse:console.log(formData),
        body: formData,
      }),
      invalidatesTags: ["User", "Dealer"],
    }),
    SignUp:builder.mutation({
      query:(formData)=>({
        url:"/account/register",
        method:"POST",
        transformResponse:console.log(formData),
        body:formData
      }),
      invalidatesTags: ["User", "Dealer"],
    })
  }),
});

export const { useSignInMutation,useSignUpMutation } = authApi;
