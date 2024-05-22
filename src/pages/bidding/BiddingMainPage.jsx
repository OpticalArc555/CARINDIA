import GridCarList from "../../components/buyCar/GridCarList"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetAllCarQuery } from "../../services/carAPI";
const BiddingMainPage = () => {
    
  const { data, error, isLoading } = useGetAllCarQuery()
  console.log(data)

  const navigate = useNavigate();
 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error?.status == 401) {
    Cookies.remove("token");
    navigate("/signin");
  }
  return (
    <>
    <GridCarList data={data} />
      
    </>
  )
}

export default BiddingMainPage
