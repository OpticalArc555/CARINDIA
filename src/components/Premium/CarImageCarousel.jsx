import React from "react";
import CarSummary from "./CarSummary";
import Accordions from "./Accordions";
export function FeaturedImageGallery() {
  const data = [
    {
      imgelink:
        "public/CarsImages/6.jpeg",
    },
    {
      imgelink:
        "public/CarsImages/2.jpeg",
    },
    {
      imgelink:
      "public/CarsImages/3.jpeg",
    },
    {
      imgelink:
      "public/CarsImages/4.jpeg",
    },
    {
      imgelink:
      "public/CarsImages/5.jpeg",
    },
    {
      imgelink:
      "public/CarsImages/6.jpeg",
    }, {
      imgelink:
      "public/CarsImages/7.jpeg",
    }, {
      imgelink:
      "public/CarsImages/8.jpeg",
    }, {
      imgelink:
      "public/CarsImages/9.jpeg",
    },
    {
      imgelink:
      "public/CarsImages/9.jpeg",
    },

  ];
 
  const [active, setActive] = React.useState(
    "public/CarsImages/1.jpeg",
  );
 
  return (
    <>
    
    
    <div className="grid gap-5  bg-gray-300">
      
      <div className="mt-10  flex justify-center content-center">
        <img
          className="h-auto w-1/2  rounded-lg  object-center md:h-[480px] "
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 m-3 gap-2 md:grid-cols-10 md:ml-5">
        {data.map(({ imgelink }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-16  cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
    <CarSummary/>
    <Accordions/>
    </>
  );
}
export default FeaturedImageGallery;