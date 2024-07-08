/* eslint-disable react/prop-types */

import { Button, Chip } from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import { Link } from "react-router-dom";
const UserCardPendingRequest = ({ item }) => {
  console.log(item);
  return (
    <div className="w-96px items-center flex justify-center mx-8">
       <div className="shadow-xl rounded-lg">
      <CardUi>
        <div className="md:min-w-[30rem] min-w-[20rem]">
          <div className="flex justify-between mr-4">
            <div className="md:ml-10 ml-4">
            <Chip
              variant="outlined"
              value={`${item?.date}`}
              className="rounded-full font-[latto] text-sm"
            ></Chip>
            </div>
            <Chip
              color="amber"
              value={`${item?.status}`}
              className="font-[latto] text-sm"
            ></Chip>
          </div>
          <div className="w-full flex justify-center">
            <div className="mt-5 flex flex-col justify-center">
              <div className="text-lg mt-3 font-[latto] font-medium text-black">
                Car Price:₹{item?.price}
              </div>
              <div className=" mt-3 font-[latto] text-lg font-medium text-black">
                Asking Price:₹{item?.askingPrice}
              </div>

              <Link to={`/carlist/cardetails/${item?.carId}`}>
                <Button className="flex gap-2 items-center mt-3 mb-3 md:mb-0 font-[latto]">
                  <span>Car Details </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardUi>
      </div>
    </div>
  );
};

export default UserCardPendingRequest;
