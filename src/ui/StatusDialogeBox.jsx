/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function StatusDialogeBox() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const [selectedOption, setSelectedOption] = React.useState("active"); 
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); 
  };

  const getButtonColor = () => {
    switch(selectedOption) {
      case "active":
        return "green"; 
      case "disable":
        return "red"; 
      case "pending":
        return "amber"; 
      default:
        return "black"; 
    }
  };

  return (
    <>
      <Button onClick={handleOpen}  color={getButtonColor()}>
        {selectedOption}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Select Status</DialogHeader>
        <DialogBody className="flex justify-center">
          <select
            className="border border-gray-400 p-4 rounded-md"
            value={selectedOption} 
            onChange={handleSelectChange} 
          >
            <option value="">Select</option>
            <option value="active">ACTIVE</option>
            <option value="disable">DISABLE</option>
            <option value="pending">PENDING</option>
          </select>
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}