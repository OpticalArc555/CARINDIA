/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import {
  useGetbyUserCarIdQuery,
} from "../services/carAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import FavCard from "./FavCard";
import { addFavoriteCar } from "../pages/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from 'react-icons/fi'; 
export function FavoritePage() {
  const dispatch = useDispatch();

  const favoriteCars = useSelector(state => state.favorites.favoriteCars);
  console.log("favoriteCars",favoriteCars);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = jwtDecodes?.userId;
  const {
    data: userCars,
    error,
    isLoading,
    refetch
  } = useGetbyUserCarIdQuery({ UserId });
  // console.log("userCars",userCars)
  // useEffect(() => {
  //   if (userCars && favoriteCars?.length === 0 && token) {
  //       dispatch(addFavoriteCar(userCars?.list[0]));
  //   }
  //   // else{
  //   //   dispatch();
  //   // }
  // }, [userCars, dispatch]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  if (error?.status === 401) {
    navigate("/signin");
    return null;
  }

  if (error && !isLoading && userCars) {
    refetch();
  }

  return (
    <>
      <div className="text-3xl font-bold mt-3 ml-16 mb-6">Favorite Page</div>
      <div className="md:grid md:grid-cols-2 md:mx-10 lg:grid lg:grid-cols-4 lg:mx-20 gap-x-4 gap-y-4">
        {favoriteCars &&
          favoriteCars?.map((data, key) => (
            <FavCard favoriteCarData={data} key={key} />
          ))}
      </div>
    </>
  );
}
