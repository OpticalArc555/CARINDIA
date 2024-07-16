import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

import { useCreateBiddingMutation } from "../services/biddingAPI";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {  useStartBiddingSetTimeMutation } from "../services/biddingAPI";



dayjs.extend(utc);
dayjs.extend(timezone);
// const TIME_ZONE = 'Asia/Kolkata';

// eslint-disable-next-line react/prop-types
export default function BiddingDialogBox({ userid, biddingcarid,handleMessage }) {
  const [open, setOpen] = useState(false);
  const [basePriceError, setBasePriceError] = useState("");
  const [durationMinutesError, setDurationMinutesError] = useState("");
  const [bidding, setBidding] = React.useState({
    beadingCarId: 0,
    createdAt: "",
    closingTime: "",
    userId: 0,
    basePrice: "",
  });
  // const [settime, setSettime] = React.useState({
  //   beadingCarId: 0,
  //   userId: 0,
  //   basePrice: 0,
  //   durationMinutes: "", // Corrected property name
  // });

  const [createBidding] = useCreateBiddingMutation();
  const [startBiddingSetTime] = useStartBiddingSetTimeMutation();

  // const [startBiddingSetTime] = useStartBiddingSetTimeMutation();

  const handleOpen = () => setOpen(!open);

  // const handleClosingTimeChange = (e) => {
  //   setBidding({
  //     ...bidding,
  //     closingTime: e.target.value,
  //   });
  // };

  const handleCreatedAtChange = (e) => {
    setBidding({
      ...bidding,
      createdAt: e.target.value,
    });
  };

  const handlebasePriceChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
     
    setBidding({
      ...bidding,
      basePrice: e.target.value,
    });
  }
  };

  // const handleDurationMinutesChange = (e) => {
  //   setSettime({
  //     ...settime,
  //     durationMinutes: Number(e.target.value), // Ensure it's a number
  //   });
  // };

  const formsubmit = async (e) => {
    e.preventDefault();
    try{
      let flag = 0;
      if (bidding.basePrice === "") {
        flag = 1;
        setBasePriceError("Please enter base price");
      } else {
        setBasePriceError("");
      }
      if ( bidding.createdAt === "") {
        flag = 1;
        setDurationMinutesError("Please select date time");
      } else {
        setDurationMinutesError("");
      }
      const specificTime = dayjs(bidding.createdAt);
        const currentTime = dayjs();
        const diffInMinutes = specificTime.diff(currentTime, 'minute');
        if(0 > diffInMinutes){
          flag = 1;
          setDurationMinutesError("Please select correct date/time");
        }
      if (flag === 0) {
        const setTimeData = {
          beadingCarId: biddingcarid,
          userId: userid,
          basePrice: bidding.basePrice,
          durationMinutes: diffInMinutes,
        };
        const {  error : bidError  } = await startBiddingSetTime(setTimeData);
        console.log("bidError",bidError )
        if(bidError || bidError?.data?.message ==="unsuccess"){
          bidError?.data?.message ==="unsuccess" ? handleMessage(bidError?.data?.exception,"error") :handleMessage(bidError?.data,"error");
        handleOpen();
        }else{
          const createdAt = {
            bidCarId: 0,
            beadingCarId: biddingcarid,
            createdAt: bidding.createdAt,
            basePrice: bidding.basePrice,
            userId: userid,
        };
        // eslint-disable-next-line no-unused-vars
        const {data , error} = await createBidding(createdAt);
        console.log("checkkkkMAsg",data)
        if(error){
          handleMessage(error?.message,"error")
        }else{
          handleMessage("Car set for bid","success")
        }
        handleOpen();
      }
        
      }
       }
       catch (error) {
        console.log("Error", error);
      }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue">
        Set Bidding
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Start Bidding.</DialogHeader>
        <DialogBody>
          
          {/* <div className="mt-5">
            <Input
              label="Closing time"
              value={bidding.closingTime}
              onChange={handleClosingTimeChange}
              type="datetime-local"
            />
          </div> */}
          <div className="">
            <Input
              label="Base Price"
              value={bidding.basePrice}
              onChange={handlebasePriceChange}
              type="text"
            />
          </div>
          <span className="text-red-500">{basePriceError}</span>
          <div className="mt-5">
          <Input
            label="Start Time"
            value={bidding.createdAt}
            onChange={handleCreatedAtChange}
            type="datetime-local"
          />
          <span className="text-red-500">{durationMinutesError}</span>
          </div>
          <div className="mt-5">
            {/* <Input
              label="Set time (minutes)"
              value={settime.durationMinutes}
              onChange={handleDurationMinutesChange}
              type="number"
            /> */}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={formsubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
