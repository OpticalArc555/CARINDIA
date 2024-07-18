/* eslint-disable no-unused-vars */
import { useState } from "react";

import FilterCars from "../components/buyCar/FilterCars";
import GridCarList from "../components/buyCar/GridCarList";
import { useFilterCarQuery } from "../services/carAPI";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const BuyCar = () => {
  const [urlState, setUrlState] = useState();
 console.log(urlState)
  // eslint-disable-next-line no-unused-vars
  const { data, error } = useFilterCarQuery(urlState);

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
    <>
    <div className="container mx-auto mt-12">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4 lg:gap-12">
        <div className="md:col-span-1 sticky top-0">
          <FilterCars setUrlState={setUrlState} />
        </div>
        <div className="md:col-span-3 no-scrollbar ">
        {error?.status === 404 ? (
      <div>
        <p>No Data Available</p>
      </div>
    ):( 
          <GridCarList data={data} error={error} />)}
        </div>
      </div>
    </div>
    </>
  );
};

export default BuyCar;
