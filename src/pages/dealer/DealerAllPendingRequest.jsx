import { useGetAllDealerPendingBookingQuery } from "../../services/dealerAPI"
import { useParams } from "react-router-dom"
import DealerCarPendingRequest from "../../components/carDetails/DealerCarPendingRequest"

const DealerAllPendingRequest = () => {
  const{id}=useParams()
  console.log(id)
    const {data,isLoading,error} = useGetAllDealerPendingBookingQuery(id)
    console.log(data)

    const renderData = data?.list.map((item, index) => {
      console.log(item)
      return (
        <div key={index} className="mt-5">
          <DealerCarPendingRequest item = {item} />
        </div>
      );
    });
    if(isLoading){
    return    <p>Loading...</p>
    }

    if(error){
        return <p>No Data Available</p>
    }

  return (
    <>
   {renderData}
   </>
  )
}

export default DealerAllPendingRequest
