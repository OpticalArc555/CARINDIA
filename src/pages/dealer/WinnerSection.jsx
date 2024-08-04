/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import {  useAllDealerFinalBidQuery,useBiddingCarByIdQuery} from "../../services/biddingAPI";
 
import TableComponent from "../../components/table/TableComponent";
import {  Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import GridCarList from "../../components/buyCar/GridCarList";
import WInnerSubCompoment from "./WInnerSubCompoment";

const WinnerSection = () => {
  const { id } = useParams();
 
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
 
  const UserID = jwtDecodes?.userId;
  const dealerId = jwtDecodes?.dealerId;
 
 
 

  const {data:didData} = useAllDealerFinalBidQuery(UserID)
  
 
  const [carIds, setCarIds] = useState([]);
  

  useEffect(() => {
    if (didData?.finalBids) {
      const carIdList = didData.finalBids.map(car => car?.beadingCarId);
      setCarIds(carIdList);
    }
  }, [didData]);

  if (carIds.length===0) {
    return <div>
      <p>No Data Available</p>
    </div>
  }
  return (
    <>
  
   <div className="flex w-full justify-center mb-10 mt-5">
    <p className="text-3xl font-semibold">Winner Section</p>
   </div>
  <div className="flex flex-wrap gap-5 justify-center">
      {carIds.map((carId, index) => (
        <WInnerSubCompoment key={index} carId={carId} />
      ))}
    </div>
    </>
  );
};
 
export default WinnerSection;
 
 