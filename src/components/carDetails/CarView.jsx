/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import { useState } from "react";
import { useFilterCarQuery } from "../../services/carAPI";
import GridCarList from "../buyCar/GridCarList";
import CarView1 from "./CarView1";
import InspectionReport from "./InspectionReport";
import KnowYourCar from "./KnowYourCar";
import TopFeatures from "./TopFeatures";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const CarView = ({
  fuelType,
  registration,
  ownerSerial,
  transmission,
  year,
  carInsurance,
  kmDriven,
  carId,
  beadingCarId
}) => {
  console.log(
    fuelType,
    registration,
    ownerSerial,
    transmission,
    year,
    carInsurance,
    kmDriven
  );
  const token = Cookies.get("token");
let jwtDecodes;
if (token) {
  jwtDecodes = jwtDecode(token);
}

const userRole = token ? jwtDecodes?.authorities[0] : null;
  return (
    <div>
      <CarView1 carId = {carId} />
      <KnowYourCar
        fuelType={fuelType}
        registration={registration}
        ownerSerial={ownerSerial}
        transmission={transmission}
        year={year}
        carInsurance={carInsurance}
        kmDriven={kmDriven}
      />

      {/* <InspectionReport/> */}
      
      {/* <TopFeatures/> */}
    </div>
  );
};

export default CarView;
