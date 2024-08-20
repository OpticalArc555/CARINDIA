/* eslint-disable no-unused-vars */
// src/features/favorites/favoritesSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import  FavoritesCarList  from './FavoritesCarList';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useGetbyUserCarIdQuery } from '../services/carAPI';

export const setFavoriteCars = (cars) => (
    {
    type: 'SET_FAVORITE_CARS',
    payload: cars,
});

// Async thunk to fetch favorite cars
// Inside fetchFavoriteCars thunk
export const fetchFavoriteCars = createAsyncThunk(
    'favorites/fetchFavoriteCars',
    async (UserId) => {
        console.log('fetchFavoriteCars called with UserId:', UserId);
        const { data ,error } = await useGetbyUserCarIdQuery({ UserId });
        console.log("I check", data);
        // const normalized = normalize(response.data, [userEntity])
        // console.log('fetchFavoriteCars called with UserId:', data);

        return data;
    }
);

  

  const initialState = {
    favoriteCars: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { favoriteCars: [], loading: 'idle',status: 'idle', },
  reducers: {
    addFavoriteCar: (state, action) => {
        // console.log("addFavoriteCar",action.payload)
      state.favoriteCars.push(action.payload);
    },
    removeFavoriteCar: (state, action) => {
      state.favoriteCars = state.favoriteCars.filter(car => car.carId !== action.payload.carId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteCars.pending, (state) => {
        console.log('fetchFavoriteCars called with UserId:',state)
        state.status = 'loading';
      })
      .addCase(fetchFavoriteCars.fulfilled, (state, action) => {
        console.log('fetchFavoriteCars called with UserId:',action.payload)
        state.status = 'succeeded';
        state.favoriteCars.push(action.payload)
      })
      .addCase(fetchFavoriteCars.rejected, (state, action) => {
        console.log('fetchFavoriteCars called with UserId:',action)
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



export const { addFavoriteCar, removeFavoriteCar } = favoritesSlice.actions;

export default favoritesSlice.reducer;
