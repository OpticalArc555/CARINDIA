/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { CarouselCustomArrows } from "./CarouselCustomArrows";
import { Link, useNavigate } from "react-router-dom";
import { useGetCarByIdQuery } from "../services/carAPI";

function FavCard({favoriteCarData}) {
  const navigate = useNavigate();
  const { carId } = favoriteCarData;
  const { data: cardata ,isLoading ,error } = useGetCarByIdQuery(carId);
  if (isLoading) {
    return <p>Loading...</p>;
  }
    const { object } = cardata;
  
 
  if (error?.status === 401) {
    navigate("/signin");
    return null
  }

  return (
    <div className="flex flex-wrap justify-center mx-auto lg:gap-5">
      <Card className="w-full flex justify-center sm:w-80 md:w-[260px] lg:w-fit items-center border-2 hover:scale-105 border-gray-300 shadow-xl overflow-hidden mx-5 md:mx-0">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none">
          <Link to={`/carlist/cardetails/${object.carId}`}>
            <CarouselCustomArrows carId={object.carId} />
          </Link>
        </CardHeader>
        <CardBody className="mb-5">
          <Typography>{object.year}</Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {object.brand} {object.model}
          </Typography>
          <Typography variant="h7" color="blue-gray" className="mb-2">
            {object.title}
          </Typography>
          <p className="text-sm uppercase mb-3 flex flex-wrap gap-2">
            <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black">
              {object.kmDriven} KM
            </span>
            <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black">
              {object.fuelType}
            </span>
            <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black">
              {object.transmission}
            </span>
          </p>
          <Typography variant="h6" className="font-bold text-black text-xl">
            ₹ {object.price}
          </Typography>
          <Link to={`/carlist/cardetails/${object.carId}`}>
            <button className="mt-2 mb-4 p-[7px] bg-indigo-500 rounded-lg text-white">
              View Car
            </button>
          </Link>
          <hr />
          <p className="text-sm">Free Test Drive Today at {object.area}</p>
        </CardBody>
      </Card> 
    </div>
  )
}

export default FavCard;