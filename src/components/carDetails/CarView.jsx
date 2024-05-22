/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import CarView1 from "./CarView1";
import InspectionReport from "./InspectionReport";
import KnowYourCar from "./KnowYourCar";
import TopFeatures from "./TopFeatures";

const CarView = ({
  fuelType,
  registration,
  ownerSerial,
  transmission,
  year,
  carInsurance,
  kmDriven,
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
      <CarView1 />
      <KnowYourCar
        fuelType={fuelType}
        registration={registration}
        ownerSerial={ownerSerial}
        transmission={transmission}
        year={year}
        carInsurance={carInsurance}
        kmDriven={kmDriven}
      />
      <InspectionReport/>
      <TopFeatures/>
    </div>
  );
};

export default CarView;
