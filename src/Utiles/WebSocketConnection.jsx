/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// WebSocketConnection.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { toast, ToastContainer } from 'react-toastify';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [topThreeBidsAmount ,setTopThreeBidsAmount]= useState([]);
//   const bidCarId = "your_bid_car_id"; // replace with actual value

  useEffect(() => {
    const socket = new SockJS('https://cf-production.up.railway.app/Aucbidding');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Connected');
        setIsConnected(true);
        stompClient.subscribe('/topic/bids', (message) => {
          const bid = JSON.parse(message.body);
          // Handle bid message
        });
        stompClient.subscribe('/topic/topThreeBids', (message) => {
          const topBids = JSON.parse(message.body);
          setTopThreeBidsAmount(topBids);
          // Handle top bids message
        });
        stompClient.subscribe('/app/placeBid', (message) => {
          const topBids = JSON.parse(message.body);
          // Handle place bid message
        }, { ack: 'client' });
         getTopThreeBids(stompClient);
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

  const getTopThreeBids = (bidCarId) => {
    console.log("Pendingcars---",client);
    if (client) {
    const bidRequest = {
      bidCarId: bidCarId,
    };
    if (client) {
      client?.publish({
        destination: '/app/topThreeBids',
        body: JSON.stringify(bidRequest),
      });
    } else {
      console.error('Stomp client is not initialized.');
    }
    }else{
        console.error('Stomp client is not initialized.');
    }
  };

  const placeBid = (userData) => {
    console.log("placebid----", userData);
    const bid = {
      placedBidId: null,
      userId: userData.userId,
      bidCarId: userData.bidCarId,
      dateTime: new Date().toISOString(),
      amount: userData.amount,
    };
  
    return new Promise((resolve, reject) => {
      if (client) {
        client.publish({
          destination: '/app/placeBid',
          body: JSON.stringify(bid),
        }, (error, response) => {
          if (error) {
            console.error('Error placing bid:', error);
            reject(error);
          } else {
            console.log('Bid placed successfully:', response);
            getTopThreeBids(client);
            resolve('Bid placed successfully');
          }
        });
  
        client.subscribe("/topic/bids", function (message) {
          var response = JSON.parse(message.body);
          resolve(response);
        });
      } else {
        console.error('Stomp client is not initialized.');
        reject('Stomp client is not initialized.');
      }
    });
  };
  
//   // Usage example
//   placeBid(userData).then((message) => {
//     console.log('Message:', message);
//   }).catch((error) => {
//     console.error('Error:', error);
//   });
  

  return (
    <WebSocketContext.Provider value={{ isConnected, placeBid ,getTopThreeBids ,topThreeBidsAmount }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

const WebSocketConnection = () => {
  return (
   <>
    <ToastContainer/>
   </>
  );
};

export default WebSocketConnection;
