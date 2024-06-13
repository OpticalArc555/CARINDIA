/* eslint-disable react/prop-types */
import { Button, Chip } from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import { Link, useParams } from "react-router-dom";
import { useConfirmBookingMutation } from "../../services/carAPI";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const DealerCarPendingRequest = ({ item }) => {
  console.log(item);
  const { id } = useParams();
  console.log(id);
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  console.log("Token ", jwtDecodes);

  const UserID = jwtDecodes?.userId;
  console.log("User ID", UserID);

  const [ConfirmBooking]  = useConfirmBookingMutation();

  const handleConfirmBook = async (event) => {
    event.preventDefault();
    const formdata = {
      date: item?.date,
      price: item?.askingPrice,
      carId: item?.carId,
      userId: UserID,
      dealerId: id
    };
    try {
      // Sending the necessary data to the API
      const response = await ConfirmBooking(formdata);
      alert("Sold")
      console.log('Booking confirmed:', response);
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleConfirmBook}>
        <CardUi>
          <div className="md:min-w-[30rem] w-[20rem]">
            <div className="flex justify-between">
              <Chip
                variant="outlined"
                value={`${item?.date}`}
                className="rounded-full font-[latto] text-sm"
              />
              <Chip
                color="amber"
                value={`${item?.status}`}
                className="font-[latto] text-sm"
              />
            </div>
            <div className="w-full flex justify-center">
              <div className="mt-5 flex flex-col justify-center">
                <div className="text-lg mt-3 font-[latto] font-medium text-black">
                  Car Price: ₹{item?.price}
                </div>
                <div className="mt-3 font-[latto] text-lg font-medium text-black">
                  Asking Price: ₹{item?.askingPrice}
                </div>
                <div className="flex justify-around gap-10">
                  <Link to={`/carlist/cardetails/${item?.carId}`}>
                    <Button
                      color="blue"
                      className="flex gap-2 items-center mt-3 font-[latto]"
                    >
                      <span>Car Details</span>
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
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    color="green"
                    className="flex gap-2 items-center mt-3 font-[latto]"
                  >
                    <span>Confirm Request</span>
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
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardUi>
      </form>
    </div>
  );
};

export default DealerCarPendingRequest;
