/* eslint-disable react/prop-types */

import { useBiddingCarByIdQuery, useGetbeadingCarImageQuery } from '../../services/biddingAPI';
import { WinnerSectionCarDefault } from '../../ui/WinnerSectionCarDefault';

export default function WInnerSubCompoment({ carId }) {
  
  
  const { data, isLoading: isLoadingCar } = useBiddingCarByIdQuery(carId);
  
  
  const beadingCarId = data?.beadingCarId;
 
  
  const { data: Image, isLoading: isLoadingImage } = useGetbeadingCarImageQuery(beadingCarId, {
    skip: !beadingCarId,
  });
  
  
  if (isLoadingCar || (beadingCarId && isLoadingImage)) {
    return <div>Loading...</div>;
  }
  
  if (!data) {
    return null;
  }
  
  return (
    <div className=''>
      <div className=''>
        <WinnerSectionCarDefault data={data} beadingCarId={data.beadingCarId} Image={Image} />
      </div>
    </div>
  );
}
