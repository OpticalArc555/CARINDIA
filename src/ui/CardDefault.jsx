/* eslint-disable react/prop-types */
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { CarouselCustomArrows } from "./CarouselCustomArrows";
import { Link } from "react-router-dom";

export function CardDefault({ data }) {
  console.log(data);
const carid = data?.carId
console.log(carid)
  return (
    <Card className="mt-6 w-96">
      <div className="p-2">
        <CarouselCustomArrows carId={carid} />
      </div>
      <CardBody>
        <Typography>{data.year}</Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
           {data.brand} {data.model} {data.carId}
        </Typography>
        <p className="text-sm uppercase">
          {data.kmDriven} {data.fuelType} {data.transmission}
        </p>
        <Typography variant="h6">₹ {data.price}</Typography>

     <Link to={`/carlist/cardetails/${data.carId}`}>   <Button className="mt-2 mb-4">View Car</Button></Link>
        <hr />
        <p className="text-sm">Free Test Drive Today at {data.area}</p>
      </CardBody>
    </Card>
  );
}
