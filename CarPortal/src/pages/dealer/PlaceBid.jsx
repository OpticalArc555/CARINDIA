import  { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import {usePlacebidsMutation} from "../../services/placingbidApi"

// eslint-disable-next-line react/prop-types
export default function PlaceBid({userid,id}) {

    const [placebids] = usePlacebidsMutation()
  const [open, setOpen] = useState(false);
  const [placebid, setPlacebid] = useState({
      userId:0,
      bidCarId:0,
      dateandtime: "",
      amount: "",
  });

  const handleOpen = () => {
    // Get current date and time when dialog opens
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPlacebid({
      ...placebid,
      dateandtime: `${currentDate} : ${currentTime}`,
    });
    setOpen(!open);
  };

  const handleamountChange = (e) => {
    setPlacebid({
      ...placebid,
      amount: e.target.value,
    });
  };

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const data ={
        userId:userid,
        bidCarId:id,
        dateTime: placebid.dateandtime,
        amount: placebid.amount,
    };
    
    try {
      const res = await placebids(data);
      console.log(res);
      setOpen(false); // Close dialog on successful submission (optional)
    } catch (error) {
      console.error(error);
      setError("An error occurred while placing your bid. Please try again.");
    }
  };

  // Use useEffect hook to update date and time on dialog open
//   useEffect(() => {
//     if (open) {
//       // Get current date and time only when dialog opens (open === true)
//       const currentDate = new Date().toISOString().slice(0, 10);
//       const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       setPlacebid({
//         ...placebid,
//         dateandtime: `${currentDate} ${currentTime}`,
//       });
//     }
//   }, [open]); // Dependency array: update only when open state changes

  return (
    <>
      <Button onClick={handleOpen} className="bg-[#045e4f]">
        Place Bid
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Place Your Bid</DialogHeader>
        <DialogBody>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message if present */}
          <Input label="Amount" value={placebid.amount} onChange={handleamountChange} />
          <div className="mt-5">
            <Input label="Date and Time (Automatically Captured)" value={placebid.dateandtime} disabled />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
