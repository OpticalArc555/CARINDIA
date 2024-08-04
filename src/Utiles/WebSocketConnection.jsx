/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// WebSocketConnection.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [topThreeBidsAmount, setTopThreeBidsAmount] = useState([]);
  const [topThreeBidsAmountArray, setTopThreeBidsAmountArray] = useState([]);
  const [liveCars, setLiveCars] = useState([]);
  const biddingData = [];

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
          // console.log("MyDAtacheck");
          setTopThreeBidsAmount(topBids);
        });
        stompClient.subscribe('/topic/liveCars', (message) => {
          const cars = JSON.parse(message.body);
          // console.log('Live cars received:', cars);
          setLiveCars(cars);
        });
        stompClient.subscribe('/topic/topBids', (message) => {
          const topBids = JSON.parse(message.body);
          // console.log('Live cars received:', topBids);
          setTopThreeBidsAmount(topBids);
        });
        stompClient.publish({ destination: '/app/liveCars' });
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

  const getLiveCars = () => {
    if (client) {
      client.publish({
        destination: '/app/liveCars'
      });
    } else {
      console.log('Stomp client is not initialized.');
    }
  }

  const getTopThreeBids = (bidCarId) => {
    if (client) {
      const bidRequest = {
        bidCarId: bidCarId,
      };

      client.publish({
        destination: '/app/topThreeBids',
        body: JSON.stringify(bidRequest),
      });

      client.subscribe(`/topic/topThreeBids`, (message) => {
        const topBids = JSON.parse(message.body);
        const exists = biddingData.some(item => bidCarId == item.bidCarId);
        if (!exists) {
          biddingData.push(...topBids);
        }
        setTopThreeBidsAmount(topBids);
        setTopThreeBidsAmountArray(biddingData);
      }, { ack: 'client' });
    } else {
      console.log('Stomp client is not initialized.');
    }
  };

  // const refreshTopThreeBids = (bidCarId) => {
  //   if (client && bidCarId) {
  //     client.publish({
  //       destination: `/topBids/${bidCarId}`,
  //     });
  //     client.subscribe('/topic/topBids', (message) => {
  //       const topBids = JSON.parse(message.body);
  //       console.log('Live cars received:', topBids);
  //       setTopThreeBidsAmount(topBids);
  //     });
  //   }
  // };

  function refreshTopThreeBids(bidCarId) {
    // const bidCarId = document.getElementById('bidCarId').value;
    if (bidCarId && client) {
        // if (bidCarId) {
        //     client.unsubscribe(`/topic/topBids/${bidCarId}`);
        // }
        // bidCarId = bidCarId;

        client.subscribe(`/topic/topBids/${bidCarId}`, function (message) {
            const topBid = JSON.parse(message.body);
            // updateTopBid(topBid);
        });

        client.send(`/app/topBids/${bidCarId}`, {}, {});
    }
}

  const placeBid = (userData) => {
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
        });

        client.subscribe("/topic/bids", (message) => {
          var response = JSON.parse(message.body);
          if(response?.status){
            console.log("bidcheck",response?.status)
            resolve(response);
          }
        });
      } else {
        console.error('Stomp client is not initialized.');
        reject('Stomp client is not initialized.');
      }
    });
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, placeBid, getTopThreeBids, topThreeBidsAmount, topThreeBidsAmountArray, getLiveCars, liveCars, refreshTopThreeBids }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

const WebSocketConnection = () => {
  return (
   <>
   </>
  );
};

export default WebSocketConnection;
