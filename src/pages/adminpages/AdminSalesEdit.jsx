import { useParams } from "react-router-dom";
import Inputs from "../../forms/Inputs";
import React from "react";
import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  useSellerByIdQuery,
  useSellerupdateMutation,
} from "../../services/salesAPI";

const AdminSalesEdit = () => {
  const { userid, salesPersonId } = useParams();
  const userId = userid;
  const { data, isLoading, isError, error } = useSellerByIdQuery({ userId });
  
  const [salesupdate] = useSellerupdateMutation();
  const [inputField, setInputField] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    if (data && data.response) {
      const { response } = data;
      setInputField({
        salesPersonId: response.salesPersonId || 0,
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        email: response.email || "",
        mobileNo: response.mobileNo || "",
        address: response.address || "",
        city: response.city || "",
        area: response.area || "",
      });
    }
  }, [data]);

  const navigate = useNavigate();
  const onChangeFormhandler = (e) => {
    const { name, value } = e.target;
    setInputField((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "email", "mobileNo", "address", "city", "area"];
    for (const field of requiredFields) {
      if (!inputField[field]) {
        return false;
      }
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    const salesdata = {
      salesPersonId: 0,
      address: inputField.address,
      city: inputField.city,
      firstName: inputField.firstName,
      lastName: inputField.lastName,
      email: inputField.email,
      mobileNo: inputField.mobileNo,
      area: inputField.area,
    };
    try {
      const res = await salesupdate({ id: salesPersonId, salesdata });
      console.log(res);
      if (res.data.status === "success") {
        alert("Successfully Edited");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto container flex justify-center w-full md:w-[50%]">
      <form className="w-full border border-gray-500 px-2 py-2 rounded-md mt-2 mb-2" onSubmit={onSubmitHandler}>
        <div className="mt-5">
          <p className="text-3xl font-semibold">Edit Sales Details</p>
        </div>
        <div className="mt-5">
          <Inputs
            label={"First Name"}
            onChange={onChangeFormhandler}
            value={inputField.firstName}
            type={"text"}
            name={"firstName"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Last Name"}
            onChange={onChangeFormhandler}
            value={inputField.lastName}
            type={"text"}
            name={"lastName"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Email"}
            onChange={onChangeFormhandler}
            value={inputField.email}
            type={"email"}
            name={"email"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"MobileNo"}
            onChange={onChangeFormhandler}
            value={inputField.mobileNo}
            type={"number"}
            name={"mobileNo"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Address"}
            onChange={onChangeFormhandler}
            value={inputField.address}
            type={"text"}
            name={"address"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"City"}
            onChange={onChangeFormhandler}
            value={inputField.city}
            type={"text"}
            name={"city"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Area"}
            onChange={onChangeFormhandler}
            value={inputField.area}
            type={"text"}
            name={"area"}
            required
          />
        </div>
        <div className="mt-5 ml-2 space-x-4">
          <Button
            type="submit"
            className="py-2 px-2 bg-indigo-600 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSalesEdit;
