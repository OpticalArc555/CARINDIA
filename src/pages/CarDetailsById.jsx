/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import CarView from "../components/carDetails/CarView";
import PriceCard from "../components/carDetails/PriceCard";
import { useParams } from "react-router-dom";
import { useFilterCarQuery, useGetCarByIdQuery } from "../services/carAPI";
import { toast, ToastContainer } from 'react-toastify';
import { useBookingRequestMutation } from "../services/carAPI";



// import { redirectToSignIn } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import GridCarList from "../components/buyCar/GridCarList";
import { useState } from "react";

const CarDetailsById = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const [urlState, setUrlState] = useState();
  console.log(urlState)
   // eslint-disable-next-line no-unused-vars
   const { data:data1, error1 } = useFilterCarQuery();
   console.log(data1)
  const { data, isLoading, error } = useGetCarByIdQuery(carId);
  console.log("error-----",error?.data?.message)
const [bookingRequest] = useBookingRequestMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }
 
  if (error?.status === 401) {

    navigate("/signin");
    return null
  }
  if(error?.data?.message === "unsuccess"){
    return <h3>Car not found
     </h3>
  }

  const handleBuyCar = async (formData) => {
    try{

      const res = await bookingRequest(formData);
      console.log(res);
      if (res?.data) {
        toast.success('Request sent successfully!');
      } else if (res.error) {
        toast.error(res.error.data.message);
      }
    }catch(error){
      toast.error(error);
    }

  }

  const {
    price,
    brand,
    fuelType,
    kmDriven,
    ownerSerial,
    year,
    model,
    registration,
    area,
    transmission,
    carInsurance,
    city,
    color,
    bodyType,
    dealer_id,

  } = data?.object;
 
  return (
    <>
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 gap-2 container mx-auto">
      <div className="p-4 md:col-span-2 max-h-screen overflow-scroll no-scrollbar ">
       <ToastContainer position="top-right" autoClose={1000} />

        <CarView
          fuelType={fuelType}
          registration={registration}
          ownerSerial={ownerSerial}
          transmission={transmission}
          year={year}
          carInsurance={carInsurance}
          kmDriven={kmDriven}
          carId = {carId}
        />
      </div>
      <div className="p-4 sticky top-0">
        <PriceCard
          price={price}
          brand={brand}
          fuelType={fuelType}
          kmDriven={kmDriven}
          ownerSerial={ownerSerial}
          year={year}
          model={model}
          registration={registration}
          area={area}
          city={city}
          color={color}
          bodyType={bodyType}
          dealer_id = {dealer_id}
          carId = {carId}
          handleBuyCar={handleBuyCar}
        />
      </div>
    </div>

    {/* <div className="flex justify-center text-{A0937D} md:mt-24 md:mb-12 mt-10 mb-6">
    <u><p className="text-4xl font-semibold ">Similar Cars</p></u>
    </div> */}
    
    {/* <div className="flex justify-center">
    <GridCarList data={data1} error={error1} />
    </div> */}
   
    </>
  );
};

export default CarDetailsById;
