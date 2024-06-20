/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useGetAllDealerCompleteBookingQuery } from "../../services/dealerAPI";
import CardUi from "../../ui/CardUi";
import { Button, CardFooter, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
const OrderDealer = () => {
  const { id } = useParams();
  
  const [pageNo , setPageNo] = useState(0)
  const { data, error, isLoading } = useGetAllDealerCompleteBookingQuery({pageNo,id});
 
  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        console.log("You are on the last page.");
      }else{
        return prePageNo + 1;
      }
    })
  }

  if(error){
    return(
      <div>
    <p>No Data Available</p>

    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
    <Typography
      variant="medium"
      color="blue-gray"
      className="font-normal"
    >
      Page {pageNo + 1}
    </Typography>
    <div className="flex gap-2">
      <Button
        variant="outlined"
        size="sm"
        disabled={pageNo <= 0}
        onClick={() => setPageNo((a) => a - 1)}
      >
        Previous
      </Button>
      <Button
        variant="outlined"
        size="sm"
        onClick={nextHandler}
        disabled={data?.bookings?.length < 10}
      >
        Next
      </Button>
    </div>
  </CardFooter>
  </div>
  )
}
  const renderData = data?.bookings?.map((item, index) => {
    return (
      <div className="w-full flex justify-center mt-5" key={index}>
        <CardUi>
          <div>
            <p>Date:<span className="text-lg font-semibold">{item?.date}</span></p>
            <p>Price:<span className="font-semibold text-lg">{item?.price}</span></p>
            <Link to={`/carlist/cardetails/${item?.carId}`}>
              <Button className="flex items-center gap-2 mt-3">
                Car details{" "}
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
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </CardUi>
      </div>
    );
  });
  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (error) {
    return <p>No Data Available</p>;
  }
  return <>
  {renderData}

  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="medium"
                color="blue-gray"
                className="font-normal"
              >
                Page {pageNo + 1}
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={pageNo <= 0}
                  onClick={() => setPageNo((a) => a - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={nextHandler}
                  disabled={data?.list?.length < 10}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
  </>;
};

export default OrderDealer;
