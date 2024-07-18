// import { useState } from "react";
// import Inputs from "../../forms/Inputs";
import carGroup from "/cars/cars.webp";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";
const HeroSection = () => {
  // const [locationState, setLocation] = useState("");

  // const [carBrandState, setCarBrand] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.target.value;
    navigate("/carlist");
    // console.log(locationState, carBrandState);
  };
  return (
    <div className="flex justify-between   ">
      <div className="md:p-12 p-4 h-auto bg-blue-100 w-full">
        <p className="flex justify-center items-center md:justify-start font-latto text-xs md:mt-8 md:text-base lg:text-lg opacity-0 animate-slidein [--slidein-delay:300ms]">
          Welcomes to CarTechIndia
        </p>
        <p className="flex justify-center items-center md:justify-start text-md md:mb-3 md:text-xl lg:text-4xl font-Merriweather animate-slidein [--slidein-delay:600ms] opacity-0 ">
          Your Journey to Exceptional
        </p>
        <p className="flex justify-center items-center md:justify-start text-md md:text-xl lg:text-4xl font-Merriweather animate-slidein [--slidein-delay:900ms] opacity-0 ">
          Cars Begins Here!
        </p>
        <div className=" flex right-0 items-center justify-center">
          <img
            alt="car"
            src={carGroup}
            className="w-[16rem] block md:w-[50rem] md:hidden"
          />
        </div>
        {/* <div className="w-[5rem] space-y-2 md:flex md:space-y-0 md:gap-2 mt-5 "> */}
        {/* <Inputs
            label="Location"
            placeholder="Search by location"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            value={locationState}
            type="text"
          />
          <Inputs
            label="Brand"
            placeholder="Search by location"
            name="brand"
            onChange={(e) => setCarBrand(e.target.value)}
            value={carBrandState}
            type="text"
          /> */}
        {/* </div> */}
        <div className="flex justify-center items-center md:justify-start">
          <Button
            onClick={submitHandler}
            className="mt-2 flex items-center gap-2 animate-slidein [--slidein-delay:950ms] opacity-0"
          >
            Get Started{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="absolute right-0 ">
        <img
          alt="car"
          src={carGroup}
          className="w-[16rem] hidden md:w-[30rem] lg:w-[50rem] md:block"
        />
      </div>
    </div>
  );
};

export default HeroSection;
