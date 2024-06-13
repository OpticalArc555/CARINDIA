

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

import {useStartBiddingSetTimeMutation} from "../services/biddingAPI"
 
// eslint-disable-next-line react/prop-types
export default function BiddingSetTime({userid, biddingcarid}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

 const [settime, setSettime] = React.useState({
    beadingCarId: 0,
    userId: 0,
    basePrice: 0,
    durationMinutes: "", // Corrected property name
  });
  const [startBiddingSetTime] = useStartBiddingSetTimeMutation();

 const handleDurationMinutesChange = (e) => {
    setSettime({
      ...settime,
      durationMinutes: Number(e.target.value), // Ensure it's a number
    });
  };

  const handlebasePriceChange = (e) => {
    setSettime({
      ...settime,
      basePrice: Number(e.target.value),
    });
  };
  console.log(settime)

  async  function formsubmit  ()  {
    
    const setTimeData = {
      beadingCarId: biddingcarid,
      userId: userid,
      basePrice: Number(settime.basePrice),
      durationMinutes: settime.durationMinutes,
    };

    console.log(setTimeData);

    const res1 = await startBiddingSetTime(setTimeData);
    console.log(res1);
  }
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="indigo">
      Set Time
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Set Bidding Time</DialogHeader>
        <DialogBody>
        <div className="mt-5">
            <Input
              label="Base Price"
              value={settime.basePrice}
              onChange={handlebasePriceChange}
              type="number"
            />
          </div>
        <div className="mt-5">
            <Input
              label="Set time (minutes)"
              value={settime.durationMinutes}
              onChange={handleDurationMinutesChange}
              type="number"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
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