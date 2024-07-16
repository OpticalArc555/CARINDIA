import { useEffect, useMemo } from 'react';
import { useGetAllLiveBiddingCarsQuery } from '../../services/biddingAPI';
import Card from './Card';

const LiveBid = () => {
  const { data, isLoading, refetch } = useGetAllLiveBiddingCarsQuery();

  // Memoize liveCarData to optimize re-renders
  const liveCarData = useMemo(() => {
    if (!isLoading && data) {
      return data;
    }
    return [];
  }, [data, isLoading]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="mx-4 mb-10 sm:mx-12">
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-3xl">Bidding Car Live</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {liveCarData.map((cardData, i) => (
          <Card key={i} cardData={cardData} />
        ))}
      </div>
    </div>
  );
};

export default LiveBid;
