/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6";

import { useBiddingCarByIdQuery, useGetCarIdTypeQuery } from "../../services/biddingAPI";
// import TopBiddingAmount from "./TopBiddingAmount";
import { Link } from "react-router-dom";
import HighestBidAmount from "./HighestBidAmount";
// eslint-disable-next-line react/prop-types
const Card = ({ cardData }) => {
    console.log(cardData);
    // const {carData} = props;
    // eslint-disable-next-line react/prop-types
    const {data} = useBiddingCarByIdQuery(cardData?.beadingCarId);
    const {data : imageData} = useGetCarIdTypeQuery(cardData?.beadingCarId);
    console.log(data,imageData);
    return (
        <>
            <div className="relative mx-auto w-full max-w-sm">
                <Link to={`/dealer/live/carDetails/${cardData?.bidCarId}/${cardData?.beadingCarId}`} className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <div className="rounded-lg bg-white   shadow-md border">
                        <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
                            <img className="h-full w-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110" src="https://fastly-production.24c.in/hello-ar/dev/uploads/664db851724c78c7fc582356/b1bb3305-0394-48a0-b46d-ba534863c117/slot/10190831792-8a6e77eec6204a84b3a57dd2b38fbb43-Exterior-6.jpg?w=690&auto=format" alt="Car 1" />
                        </div>
                        <div className="p-4">
                            <div className=" flex justify-between  items-center">
                                <h2 className="line-clamp-1 text-[14px] font-semibold text-gray-800" title="New York">{data?.year+" "+data?.brand+" "+data?.model} </h2>
                                <i className="fa fa-heart"></i>
                            </div>
                            <div className="flex md:space-x-1 space-x-1 mt-3">
                                <div className="p-2 text-[10px] bg-gray-100 rounded-md">{data?.kmDriven} km</div>
                                <div className="p-2 text-[10px] bg-gray-100 rounded-md">{data?.ownerSerial} owner</div>
                                <div className="p-2 text-[10px] bg-gray-100 rounded-md">{data?.fuelType}</div>
                                <div className="p-2 text-[10px] bg-gray-100 rounded-md">{data?.registration}</div>
                                <div className="p-2 text-[10px] bg-gray-100 rounded-md">Engine 4.5 ✰</div>
                            </div>
                            <div className="mt-4 -ml-4 flex justify-between items-center">
                                <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                                    <span className="text-[16px] bg-indigo-300 p-3 text-white">Highest Bid ₹ <HighestBidAmount bidId={cardData?.bidCarId} /></span>
                                </p>
                                <div className="text-center">
                                    <p className="text-primary inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                                        <span className="flex line-clamp-1 text-[12px] text-gray-800">Last Call</span>
                                    </p>
                                    <p className="flex line-clamp-1 text-[12px] text-gray-800">00h 03m 43s</p>
                                </div>
                            </div>
                           {/* <TopBiddingAmount beadingCarId={cardData?.beadingCarId} /> */}
                            <div className="mt-4">
                                <p className="flex line-clamp-1 text-[12px] text-gray-800">
                                    <span className="mr-1 mt-1"><FaLocationDot /></span>
                                    {data?.area+" "+data?.city}
                                </p>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button type="button" className="px-4 py-2 bg-[#9FA8DA] text-white rounded-lg">View</button>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

        </>
    )
}
export default Card;