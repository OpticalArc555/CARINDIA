import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

import { useCreateBiddingMutation } from "../services/biddingAPI";

// eslint-disable-next-line react/prop-types
export default function BiddingDialogBox({ userid, biddingcarid }) {
  const [open, setOpen] = React.useState(false);
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
  // const [startBiddingSetTime] = useStartBiddingSetTimeMutation();

  const handleOpen = () => setOpen(!open);

  const handleClosingTimeChange = (e) => {
    setBidding({
      ...bidding,
      closingTime: e.target.value,
    });
  };

  const handleCreatedAtChange = (e) => {
    setBidding({
      ...bidding,
      createdAt: e.target.value,
    });
  };

  const handlebasePriceChange = (e) => {
    setBidding({
      ...bidding,
      basePrice: Number(e.target.value),
    });
  };

  // const handleDurationMinutesChange = (e) => {
  //   setSettime({
  //     ...settime,
  //     durationMinutes: Number(e.target.value), // Ensure it's a number
  //   });
  // };

  const formsubmit = async (e) => {
    e.preventDefault();

    const biddingData = {
      beadingCarId: biddingcarid,
      closingTime: bidding.closingTime,
      createdAt: bidding.createdAt,
      basePrice: Number(bidding.basePrice),
      userId: userid,
    };

    console.log(biddingData);

    const res = await createBidding(biddingData);
    console.log(res);

    // const setTimeData = {
    //   beadingCarId: biddingcarid,
    //   userId: userid,
    //   basePrice: Number(bidding.basePrice),
    //   durationMinutes: settime.durationMinutes,
    // };

    // console.log(setTimeData);

    // const res1 = await startBiddingSetTime(setTimeData);
    // console.log(res1);

    handleOpen();
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue">
        Start Bidding
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
          <Input
            label="Created at"
            value={bidding.createdAt}
            onChange={handleCreatedAtChange}
            type="datetime-local"
          />
          <div className="mt-5">
            <Input
              label="Closing time"
              value={bidding.closingTime}
              onChange={handleClosingTimeChange}
              type="datetime-local"
            />
          </div>
          <div className="mt-5">
            <Input
              label="Base Price"
              value={bidding.basePrice}
              onChange={handlebasePriceChange}
              type="number"
            />
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
