/* eslint-disable no-unused-vars */
// src/features/favorites/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import  FavoritesCarList  from './FavoritesCarList';

export const setFavoriteCars = (cars) => (
    {
    type: 'SET_FAVORITE_CARS',
    payload: cars,
});

const initialState = {
  favoriteCars: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteCar: (state, action) => {
        console.log("addFavoriteCar",action.payload)
      state.favoriteCars.push(action.payload);
    },
    removeFavoriteCar: (state, action) => {
      state.favoriteCars = state.favoriteCars.filter(car => car.carId !== action.payload.carId);
    },
  },
});

export const { addFavoriteCar, removeFavoriteCar } = favoritesSlice.actions;

export default favoritesSlice.reducer;
