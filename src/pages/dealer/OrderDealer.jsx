import { useParams } from "react-router-dom";
import { useGetAllDealerCompleteBookingQuery } from "../../services/dealerAPI";
import CardUi from "../../ui/CardUi";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const OrderDealer = () => {
  const { id } = useParams();
  console.log(id);
  const page = 0;
  const { data, error, isLoading } = useGetAllDealerCompleteBookingQuery({
    page,
    id,
  });
  console.log(data);
  console.log(error);

  if(error){
    return <p>No Data Available</p>
}
  const renderData = data?.bookings?.map((item, index) => {
    console.log(item);
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
  return <>{renderData}</>;
};

export default OrderDealer;
