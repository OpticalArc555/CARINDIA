/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
// import {usePlacebidsMutation} from "../../services/placingbidApi";
// import { Client } from '@stomp/stompjs';
// import SockJS from "sockjs-client/dist/sockjs"
const TIME_ZONE = "Asia/Kolkata";
import moment from "moment-timezone";
import { useWebSocket } from "../../Utiles/WebSocketConnection";

window.global = window;

// eslint-disable-next-line react/prop-types
export default function PlaceBid({
  beadingCarId,
  UserID,
  handleMessage,
  topThreeBids,
}) {
  const [bidAmount, setBidAmount] = useState(20000);
  const [lastBidAmount, setLastBidAmount] = useState(40000);
  const [open, setOpen] = useState(false);
  const { placeBid, getTopThreeBids } = useWebSocket();

  const handleOpen = () => {
    setOpen(!open);
  };
  const [error, setError] = useState(null);

  const handlePlaceBid = async () => {
    try {
      const bid = {
        placedBidId: null,
        userId: UserID,
        bidCarId: beadingCarId,
        dateTime: new Date().toISOString(),
        // dateTime : moment().tz(TIME_ZONE).format('YYYY-MM-DD HH:mm:ss'),
        amount: bidAmount,
      };
      const message = await placeBid(bid);
      if (message?.status == "error") {
        handleMessage(message?.message, "error");
      } else {
        handleMessage(message, "success");
      }
      handleOpen();
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleMinusAmount = () => {
    if (lastBidAmount > topThreeBids) {
      const amount = lastBidAmount - 2000;
      setBidAmount(amount);
      setLastBidAmount(amount);
    }
  };

  const handlePlusAmount = () => {
    const amount = lastBidAmount + 2000;
    setBidAmount(amount);
    setLastBidAmount(amount);
  };

  const handleamountChange = (e) => {
    setBidAmount(e.target.value);
  };

  return (
    <>
      <div className="">
      <Button onClick={handleOpen} className="bg-[#045e4f]">
        Place Bid
      </Button>
      <Dialog open={open} handler={handleOpen} className="max-w-full">
        <DialogHeader>Place Your Bid</DialogHeader>
        <DialogBody>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message if present */}
          {/* <Input label="Amount" value={bidAmount} onChange={handleamountChange} /> */}
          <div className="flex w-full max-w-[35rem] gap-4">
            <Button
              // color={email ? "gray" : "blue-gray"}
              // disabled={!email}
              className=" rounded"
              onClick={handleMinusAmount}
            >
              Minus
            </Button>
            <Input
              type="text"
              label="Amount"
              value={bidAmount}
              onChange={handleamountChange}
              className=""
              containerProps={{
                className: "min-w-0",
              }}
              readOnly
            />
            <Button
              // color={email ? "gray" : "blue-gray"}
              // disabled={!email}
              onClick={handlePlusAmount}
              className=" rounded"
            >
              Plus
            </Button>
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
          <Button variant="gradient" color="green" onClick={handlePlaceBid}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
    </>
  );
}
