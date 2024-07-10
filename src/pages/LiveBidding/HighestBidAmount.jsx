/* eslint-disable no-unused-vars */
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from "sockjs-client/dist/sockjs";

// eslint-disable-next-line react/prop-types
const HighestBidAmount = ({bidId}) => {
 const [isConnected, setIsConnected] = useState(false); // New state variable
 const [bids, setBids] = useState([]);
 const [client, setClient] = useState(null);
 const [topThreeBids, setTopThreeBids] = useState([]);

    useEffect(() => {
        const socket = new SockJS('https://cf-production.up.railway.app/Aucbidding');
        const stompClient = new Client({
          webSocketFactory: () => socket,
          debug: (str) => {
            console.log(str);
          },
          onConnect: () => {
            console.log('Connected');
            setIsConnected(true); // Update connection status
            stompClient.subscribe('/topic/bids', (message) => {
              const bid = JSON.parse(message.body);
              setBids((prevBids) => [...prevBids, bid]);
            });
            stompClient.subscribe('/topic/topThreeBids', (message) => {
              const topBids = JSON.parse(message.body);
              setTopThreeBids(topBids);
            });
            getTopThreeBids(stompClient); // Fetch top three bids when connected
          },
          onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
          },
        });
    
        stompClient.activate();
        setClient(stompClient);
    
        return () => {
          stompClient.deactivate();
        };
      }, []);

      const getTopThreeBids = (stompClient) => {
        const bidRequest = {
          bidCarId: bidId,
        };
        if (stompClient) {
          stompClient.publish({
            destination: '/app/topThreeBids',
            body: JSON.stringify(bidRequest),
          });
        } else {
          console.error('Stomp client is not initialized.');
        }
      };
    

    return(
        <>
            {topThreeBids[0]?.amount || "-"}
        </>
    )
}

export default HighestBidAmount;