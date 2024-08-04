/* eslint-disable no-unused-vars */
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { CarouselCustomArrows } from "./CarouselCustomArrows";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../ui/FavoriteContext";
import {
  useGetbySaveCarIdQuery,
  useGetbyUserCarIdQuery,
} from "../services/carAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useGetCarByIdQuery } from "../services/carAPI";
import FavCard from "./FavCard";

export function FavoritePage() {
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
  } = useGetbyUserCarIdQuery({ UserId });
  console.log("userCars", userCars?.list);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error?.status === 401) {
    navigate("/signin");
    return null;
  }

  return (
    <>
      <div className="text-3xl font-bold mt-3 ml-16 mb-6">
        Favorite Page
      </div>
      <div className="md:grid md:grid-cols-4 md:mx-20 gap-x-4 gap-y-4">
        {userCars?.list &&
          userCars?.list?.map((data, key) => (
            <FavCard favoriteCarData={data} key={key} />
          ))}
      </div>
    </>
  );
}
