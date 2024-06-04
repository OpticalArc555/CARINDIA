import { useState } from "react";

import FilterCars from "../components/buyCar/FilterCars";
import GridCarList from "../components/buyCar/GridCarList";
import { useFilterCarQuery } from "../services/carAPI";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const BuyCar = () => {
  const [urlState, setUrlState] = useState();
 
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useFilterCarQuery( urlState);

  const navigate = useNavigate();
 console.log(data)

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  if (error?.status == 401) {
    Cookies.remove("token");
    navigate("/signin");
  }
  return (
    <div className="container mx-auto mt-12 max-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1 sticky top-0 max-h-screen ">
          <FilterCars setUrlState={setUrlState} />
        </div>
        <div className="md:col-span-3 max-h-screen overflow-scroll no-scrollbar ">
          <GridCarList data={data} error={error} />
        </div>
      </div>
    </div>
  );
};

export default BuyCar;
