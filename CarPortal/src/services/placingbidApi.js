
import { apiSlice } from "./apiSlice";

export const placebidAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placebids : builder.mutation({
            query : (formdata) => ({
                url : '/Bid/placeBid?bidCarId=26',
                transferResponse: console.log(formdata),
                method :"POST",
                body : formdata
            }),

        })
    })
})

export const {usePlacebidsMutation} = placebidAPI;