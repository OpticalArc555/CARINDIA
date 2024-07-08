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

      <div className="mt-5">
        <Link to={`/dealer/finalreport/${beadingCarId}`}>
        <Button>
          View Inspection Report
        </Button>
        </Link>
      </div>
      {/* <InspectionReport/> */}
      
      {/* <TopFeatures/> */}
    </div>
  );
};

export default CarView;
