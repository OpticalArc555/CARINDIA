/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import CardUi from "../../ui/CardUi";
import { jwtDecode } from "jwt-decode";
// import DialogBox from "../../ui/DialogBox";

import { Chip } from "@material-tailwind/react";
import { IoHome } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import BiddingSetTime from "../../ui/BiddingSetTime";
// import BiddingDailogeBox from "../../ui/BiddingDialogeBox"
import PlaceBid from "../../pages/dealer/PlaceBid";
import {useGetbeadingGetByIdQuery} from "../../services/biddingAPI"
const BiddingPriceCard = ({
  beadingCarId,
  getTopThreeBids,
  topThreeBids,
  placeBid
  // price,
  // brand,
  // fuelType,
  // kmDriven,
  // ownerSerial,
  // year,
  // model,
  // registration,
  // city,
  // area,
  // color,
  // bodyType,
  // transmission,
}) => {
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const userRole = jwtDecodes?.authorities[0];
  const UserId = token ? jwtDecodes?.userId : null;


  const {data} = useGetbeadingGetByIdQuery(beadingCarId);
  console.log("topThreeBids",topThreeBids[0]?.amount)
  return (
    <CardUi>
      <div className="w-full md:w-full">
        <p className="font-extrabold text-2xl text-black uppercase font-[latto] ml-2">
          {data?.year} {data?.brand} {data?.model}
        </p>
        <p className="uppercase font-[Merriweather] ml-2 md:ml-0">
          {data?.color} {data?.bodyType} & {data?.transmission}
        </p>
        <div className="my-4 flex gap-2 overflow-x-auto scrollbar ml-2 md:ml-0">
          <Chip
            variant="outlined"
            value={`${data?.kmDriven} KM`}
            className="text-sm text-black font-[latto] hover:bg-gray-900 hover:text-white"
          />
          <Chip
            variant="outlined"
            value={`${
              data?.ownerSerial === 1
                ? "1ST"
                : data?.ownerSerial === 2
                ? "2ND"
                : data?.ownerSerial === 3
                ? "3RD"
                : data?.ownerSerial === 4
                ? "4TH"
                : data?.ownerSerial === 5
                ? "5TH"
                : ""
            } Owner`}
            className="text-base text-black font-[latto] hover:bg-gray-900 hover:text-white"
          />
          <Chip
            variant="outlined"
            value={`${data?.fuelType}`}
            className="text-base text-black font-[latto] hover:bg-gray-900 hover:text-white"
          />
          <Chip
            variant="outlined"
            value={`${data?.registration}`}
            className="text-base text-black font-[latto] hover:bg-gray-900 hover:text-white"
          />
        </div>
        <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0">
          <IoHome />
          <div className="mt-4 text-base font-[latto]">
            Home Test Drive Available
          </div>
        </div>
        <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0">
          <FaLocationDot />
          <div className="mt-4 text-base text-gray-700 font-[latto]">
            Parked at: {data?.area}, {data?.city}
          </div>
        </div>
        <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0">
          <FaFileAlt />
          <div className="mt-4 text-base text-gray-700 font-[latto]">
            View Inspection Report
          </div>
        </div>
        <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0">
          <IoLogoWhatsapp />
          <div className="mt-4 mb-6 text-base text-gray-700 font-[latto]">
            Get Service History Report
          </div>
        </div>
        <hr className="border-gray-400" />
        <div className="flex justify-center align-middle items-center my-3">
          <div className="text-center">
            <div className="text-xl font-bold text-black font-[latto]">
            Top Bidding Amount:  ₹{topThreeBids[0]?.amount}
            </div>
            <div className="uppercase text-gray-700 text-xs font-[latto]">
              Understand Price
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center align-middle mb-3">
          {userRole === "SALESPERSON" ? (
            <div>
              <p className="text-2xl font-semibold text-black">Start Bidding</p>
              <div className="flex mt-5">
                <div>
                  <BiddingSetTime
                    userid={UserId}
                    biddingcarid={data?.beadingCarId}
                  />
                </div>
                {/* <div className="ml-5">
                  <BiddingDailogeBox
                    userid={UserID}
                    biddingcarid={data?.beadingCarId}
                  />
                </div> */}
                <div className="ml-5">
                  {/* <PlaceBid /> */}
                </div>
              </div>
            </div>
          ) :
          userRole === "DEALER" ?
          
          (<div>
          <p className="text-2xl font-semibold text-black">Start Bidding</p>
          <div className="flex mt-5">
            {/* <div>
              <BiddingSetTime
                userid={UserID}
                biddingcarid={data?.beadingCarId}
              />
            </div> */}
            {/* <div className="ml-5">
              <BiddingDailogeBox
                userid={UserID}
                biddingcarid={data?.beadingCarId}
              />
            </div> */}
            <div className="ml-5">
              <PlaceBid beadingCarId={beadingCarId} UserID={UserId} getTopThreeBids={getTopThreeBids} topThreeBids={topThreeBids} placeBid={placeBid} />
            </div>
          </div>
        </div>) : null}
        </div>
      </div>
    </CardUi>
  );
};

export default BiddingPriceCard;
