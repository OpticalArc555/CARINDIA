import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, CardBody, Typography } from "@material-tailwind/react";
import Inputs from "../../forms/Inputs";
import CardUi from "../../ui/CardUi";
import { useSignUpMutation } from "../../services/authAPI";

export function AddDealerForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [SignUp] = useSignUpMutation();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    roles: "DEALER",
    document: 0,
    shopName: "",
    area: "",
    status: false,
    userType: "",
  });
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here, e.g., send data to backend
    try {
      const { data } = await SignUp(formData);
      console.log(data);
      alert("Register Sucessfully")
    } catch (error) {
      console.log(error);
    }
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      password: "",
      area: "",
      city: "",
      address: "",
      shopName: "",
    });
    // Close the dialog
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} className="flex gap-2">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Dealer
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <CardUi>
          <CardBody className="flex flex-col gap-4 ">
            <Typography variant="h4" color="blue-gray">
              Add Dealer
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-3  ">
              <div className="flex gap-2">
                <Inputs
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Inputs
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <Inputs
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Inputs
                label="Mobile Number"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
              />
              <Inputs
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex gap-2">
                <Inputs
                  label="Area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
                <Inputs
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <Inputs
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Inputs
                label="Shop Name"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
              />
              <Button type="submit">Add</Button>
            </form>
          </CardBody>
        </CardUi>
      </Dialog>
    </>
  );
}
