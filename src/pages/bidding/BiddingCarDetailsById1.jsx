/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// import CarView from "../../components/carDetails/CarView";
// import PriceCard from "../../components/carDetails/PriceCard";
import { useParams } from "react-router-dom";
import { useGetbeadingCarImageQuery,useGetbeadingCarByIdQuery } from "../../services/biddingAPI";
// import { redirectToSignIn } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import BiddingCarView from "./BiddingCarView";
import BiddingPriceCard from "./BiddingPriceCard";
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useWebSocket } from "../../Utiles/WebSocketConnection";

export default function BiddingCarDetailsById1() {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [topThreeBids, setTopThreeBids] = useState([]);
  const [client, setClient] = useState(null);
  const { beadingCarId ,bidCarId } = useParams();
  const [isConnected, setIsConnected] = useState(false); // New state variable
    const {data , isLoading, error} = useGetbeadingCarByIdQuery(beadingCarId);
    if (isLoading) {
      return <p>Loading...</p>;
    }
   
    if (error?.status === 401) {
  
      navigate("/signin");
      return null
    }
    console.log(data);
    const {
      price,
      brand,
      fuelType,
      kmDriven,
      ownerSerial,
      year,
      model,
      registration,
      area,
      transmission,
      carInsurance,
      city,
      color,
      bodyType,
      dealerId,
  
    } = data;

    // if (isLoading) {
    //   return <p>Loading...</p>;
    // }
    
  //  console.log(carId);
    
    // if (error?.status === 401) {
    //   console.log("navigate");
  
    //   navigate("/signin");
    //   return null
    // }
    // useEffect(() => {
    //   const socket = new SockJS('https://cffffftasting-production.up.railway.app/Aucbidding');
    //   const stompClient = new Client({
    //     webSocketFactory: () => socket,
    //     debug: (str) => {
    //       console.log(str);
    //     },
    //     onConnect: () => {
    //       console.log('Connected');
    //       setIsConnected(true); // Update connection status
    //       stompClient.subscribe('/topic/bids', (message) => {
    //         const bid = JSON.parse(message.body);
    //         setBids((prevBids) => [...prevBids, bid]);
    //       });
    //       stompClient.subscribe('/topic/topThreeBids', (message) => {
    //         const topBids = JSON.parse(message.body);
    //         setTopThreeBids(topBids);
    //       });
    //       stompClient.subscribe('/app/placeBid', (message) => {
    //         const topBids = JSON.parse(message.body);
    //         setTopThreeBids(topBids);
    //       },{ack: 'client'});
          
    //       getTopThreeBids(stompClient); // Fetch top three bids when connected
    //     },
    //     onStompError: (frame) => {
    //       console.error('Broker reported error: ' + frame.headers['message']);
    //       console.error('Additional details: ' + frame.body);
    //     },
    //   });
  
    //   stompClient.activate();
    //   setClient(stompClient);
  
    //   return () => {
    //     stompClient.deactivate();
    //   };
    // }, []);
    
    // const getTopThreeBids = (stompClient) => {
    //   const bidRequest = {
    //     bidCarId: bidCarId,
    //   };
    //   if (stompClient) {
    //     stompClient.publish({
    //       destination: '/app/topThreeBids',
    //       body: JSON.stringify(bidRequest),
    //     });
    //   } else {
    //     console.error('Stomp client is not initialized.');
    //   }
    // };

    // const placeBid = (userData) => {
    //   const bid = {
    //     placedBidId: null,
    //     userId: userData.userId,
    //     bidCarId: bidCarId,
    //     dateTime: new Date().toISOString(),
    //     // dateTime : moment().tz(TIME_ZONE).format('YYYY-MM-DD HH:mm:ss'),
    //     amount: userData.amount,
    //   };
     
    //   if (client) {
    //     client.publish({
    //       destination: '/app/placeBid',
    //       body: JSON.stringify(bid),
    //     }, (error, response) => {
    //       if (error) {
    //         toast.error('Error placing bid:', error);
    //         // console.error('Error placing bid:', error);
    //       } else {
    //         toast.error('Bid placed successfully:');
            
    //         console.log('Bid placed successfully:', response);
    //         getTopThreeBids(client);
    //       }
    //     });
      
    //     client.subscribe("/app/placeBid", function(message) {
    //       var quote = JSON.parse(message.body);
    //       alert(quote.symbol + " is at " + quote.value);
    //     });
    //   } else {
    //     toast.error('Stomp client is not initialized.');
    //     // console.error('Stomp client is not initialized.');
    //   }
    // };
   

    const handleMessage = (msg,action) => {
      if(action == "error"){
        toast.error(msg);
      }else{
        toast.success(msg);
      }
    }

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-3 gap-4 container mx-auto">
  <div className="p-4 md:col-span-2 max-h-screen overflow-scroll no-scrollbar">
    <ToastContainer />
    <BiddingCarView
      beadingCarId={beadingCarId}
      fuelType={fuelType}
      registration={registration}
      ownerSerial={ownerSerial}
      transmission={transmission}
      year={year}
      carInsurance={carInsurance}
      kmDriven={kmDriven}
    />
  </div>
  <div className="md:col-span-1 sticky top-0">
    <BiddingPriceCard
      beadingCarId={beadingCarId}
      // getTopThreeBids={getTopThreeBids}
      topThreeBids={topThreeBids}
      // placeBid={handlePlaceBid}
      handleMessage={handleMessage}
      price={price}
      brand={brand}
      fuelType={fuelType}
      kmDriven={kmDriven}
      ownerSerial={ownerSerial}
      year={year}
      model={model}
      registration={registration}
      area={area}
      city={city}
      color={color}
      bodyType={bodyType}
      dealer_id = {dealerId}
    />
  </div>
</div>

  )
}
