import { useState } from "react";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import CardUi from "../../ui/CardUi";
// import { useSignUpMutation } from "../../services/authAPI";
import Inputs from "../../forms/Inputs";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export function ChangePassword() {
//   const [SignUp] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formStateData, setFormData] = useState({
    dealerId: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    dealerId: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validate input fields
    if (type !== "checkbox") {
      validateInput(name, value);
    }
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "dealerId":
        error = value.trim() === "" ? "Dealer Id is required" : "";
        break;
      case "oldPassword":
        error = value.trim() === "" ? "Old Password is required" : "";
        break;
      case "newPassword":
        error = value.trim() === "" ? "New Password is required" : "";
        break;
      case "confirmNewPassword":
        error = value.trim() === "" ? "Confirm Password is required" : "";
        break;
      default:
        break;
    }

    if (name === "confirmNewPassword" || name === "newPassword") {
      if (formStateData.newPassword !== formStateData.confirmNewPassword) {
        error = "Passwords do not match";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Validate all fields before submission
    let hasError = false;
    Object.keys(formStateData).forEach((key) => {
      validateInput(key, formStateData[key]);
      if (errors[key]) {
        hasError = true;
      }
    });

    // Validate if passwords match
    if (formStateData.newPassword !== formStateData.confirmNewPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmNewPassword: "Passwords do not match",
      }));
      hasError = true;
    }
     console.log(formStateData);

    if (!hasError) {
      // Your form submission logic goes here
      console.log("Form data submitted:", formStateData);
      try {
        // const { data } = await SignUp(formStateData);
        // console.log(data);
        alert("Password Changed Successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  return (
    <div className="h-auto mt-10 flex justify-center items-center">
      <CardUi color="transparent" shadow={false}>
        <Typography variant="h3" color="black" className="text-center">
          Change Password
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6 w-100">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Dealer Id
            </Typography>
            <Inputs
              label={"Enter Dealer Id"}
              name="dealerId"
              value={formStateData.dealerId}
              onChange={handleChange}
              error={errors.dealerId}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Old Password
            </Typography>
            <Inputs
              label={"Old Password"}
              type={showPassword ? "text" : "oldPassword"}
              name="oldPassword"
              value={formStateData.oldPassword}
              onChange={handleChange}
              error={errors.oldPassword}
              required={"required"}
              icon={
                showPassword ? (
                  <VisibilityOff
                    onClick={handleTogglePassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <Visibility
                    onClick={handleTogglePassword}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              New Password
            </Typography>
            <Inputs
              label={"New Password"}
              type={showPassword ? "text" : "newPassword"}
              name="newPassword"
              value={formStateData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <Inputs
              label={"Confirm Password"}
              type={showPassword ? "text" : "oldPassword"}
              name="confirmNewPassword"
              value={formStateData.confirmNewPassword}
              onChange={handleChange}
              error={errors.confirmNewPassword}
              required={"required"}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <Link
                  to="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            name="status"
            checked={formStateData.status}
            onChange={handleChange}
            // error={errors.agreeTerms}
          />
          <Button className="mt-6" fullWidth type="submit">
            Change Password
          </Button>
        </form>
      </CardUi>
    </div>
  );
}

export default ChangePassword;
