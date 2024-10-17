/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { CarouselCustomArrows } from "./CarouselCustomArrows";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useFavoriteCarMutation,
  useCarremoveFavoriteMutation,
  useCarFavoriteAddRemoveQuery,
} from "../services/carAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCar, removeFavoriteCar } from "../pages/favoritesSlice";

function RatedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="red"
      className="h-6 w-6"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

function UnratedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

export function PremiumCardDefault1({ data, Carid, refetch }) {
  const dispatch = useDispatch();
  const favoriteCars = useSelector((state) => state.favorites.favoriteCars);
  const [isHovered, setIsHovered] = useState(false);

  const [favoriteCar] = useFavoriteCarMutation();
  const toke = Cookies.get("toke");
  let jwtDecodes;

  if (toke) {
    jwtDecodes = jwtDecode(toke);
  }
  const UserId = jwtDecodes?.userId;
  const userRole = toke ? jwtDecodes?.authorities[0] : null;
  const data2 = {
    carId: Carid,
    userId: UserId,
  };
  const carid = data2.carId;
  const useid = data2.userId;

  const {
    data: favData,
    error,
    refetch: refetchFavCarData,
  } = useCarFavoriteAddRemoveQuery({ carid, useid });

  const [CarremoveFavorite] = useCarremoveFavoriteMutation();

  const handleFavoriteToggle = async () => {
    const data2 = {
      carId: Carid,
      userId: UserId,
    };
    if (favoriteCars?.find((favCar) => favCar.carId === data.carId)) {
      dispatch(removeFavoriteCar(data));
      const res = await CarremoveFavorite({
        saveCarId: favData?.object?.saveCarId,
      });
      refetchFavCarData();
    } else {
      const res = await favoriteCar(data2);
      dispatch(addFavoriteCar(data2));
      // refetchFavCarData()
    }
  };

  const combinedText = `${data.brand} ${data.model}`;
  const truncatedText =
    combinedText.length > 25
      ? combinedText.substring(0, 22) + "..."
      : combinedText;
  return (
    <div className="flex justify-center mx-auto">
      <Card className="w-[20rem] mt-5 hover:border hover:border-3 border border-blue-400 shadow-md shadow-black">
        <CardHeader className="h-full">
          <Link to={`/carlist/cardetails/premium/${data.carId}`}>
            <CarouselCustomArrows carId={data.carId} />
          </Link>
        </CardHeader>
        <CardBody>
            {userRole === "USER" ? (
              <div className="flex justify-end">
                <div onClick={handleFavoriteToggle} className="cursor-pointer">
                  <div className="-mb-6">
                    {favoriteCars?.some(
                      (favCar) => favCar.carId === data.carId
                    ) ? (
                      <RatedIcon />
                    ) : (
                      <UnratedIcon />
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="p-2">
              <h3 className="text-xl font-[latto] font-bold text-black">
                ₹ {data.price}
              </h3>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-xl text-black uppercase"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? data.brand + " " + data.model : truncatedText}
                {/* {`${data.brand} ${data.model}`.length > 25 ? `${data.brand} ${data.model}`.substring(0, 22) + '...' : `${data.brand} ${data.model}`} */}
              </Typography>
              <div className="grid grid-cols-2 gap-2 mt-8">
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    REG. YEAR
                  </p>
                  <p className="text-sm font-semibold text-black font-[latto]">
                    {data.year}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">KMS</p>
                  <p className="text-sm font-semibold text-black font-[latto]">
                    {data.kmDriven}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    FUEL TYPE
                  </p>
                  <p className="text-sm font-semibold text-black font-[latto] uppercase">
                    {data.fuelType}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    REG. STATE
                  </p>
                  <p className="text-sm font-semibold text-black font-[latto] uppercase">
                    {data.city}
                  </p>
                </div>
              </div>
            </div>
            {/* <Link to={`/carlist/cardetails/${data.carId}`}>
            <button className="mt-2 mb-4 p-[7px] bg-indigo-500 rounded-lg      text-white">
              View Car
            </button>
          </Link> */}
         
        </CardBody>
      </Card>
    </div>
  );
}
