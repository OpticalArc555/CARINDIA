/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Carousel } from "@material-tailwind/react";

import Exterior from "/cars/Exterior.webp";
import Interior from "../Img_UI/Interior.webp";
import Features from "../Img_UI/Features.webp";
import Tyres from "../Img_UI/Tyres.webp";
import Engine from "../Img_UI/Engine.webp";

import { useGetCarImageByIdQuery } from "../../services/carAPI";

// eslint-disable-next-line react/prop-types
const CarView1 = ({ carId }) => {
  // const [img360, setImg360] = useState(true);
  const [interior, setInterior] = useState(false);
  const [exterior, setExterior] = useState(true);
  const [features, setFeatures] = useState(false);
  const [tyres, setTyres] = useState(false);
  const [engines, setEngines] = useState(false);
  console.log(exterior);

  const { data, isLoading, error } = useGetCarImageByIdQuery({ carId });
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="font-[Merriweather] md:text-center text-center">
        Image not available{" "}
        <div className="flex justify-center">
          <img
            className=" md:w-[12rem] w-[10rem] opacity-50 "
            src="..\..\cars\no-image-available.png"
            alt="no image"
          />
        </div>
      </div>
    );

  const ExteriorImages = data.object.filter(
    (item) => item.documentType === "Exterior"
  );
  const InteriorImages = data.object.filter(
    (item) => item.documentType === "Interior"
  );
  const TyreImages = data.object.filter((item) => item.documentType === "Tyre");
  const FeaturesImages = data.object.filter(
    (item) => item.documentType === "Features"
  );
  const EngineImages = data.object.filter(
    (item) => item.documentType === "Engine"
  );

  const fallbackImage = "..\\..\\cars\\no-image-available.png";

  const ChooseCarColor = () => {
    return (
      <div className="container mx-auto w-full h-[16rem] md:w-3/4 ml-8 md:ml-5 md:h-[30rem]">
        {/* {img360 && (
          <div className="max-w-md mx-auto mb-5">
            <div className="flex justify-center">
              <div className="row">
                <div className="col-7 md:w-[40rem]">
                  <div className="car">
                    <div id="carDefault" className="w-full">
                      <ThreeSixty
                        amount={8}
                        imagePath={`/cars/images-red/images-red-1/`}
                        fileName="civic-{index}.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {interior && (
          <Carousel className="bg-white rounded-lg shadow-md  ">
            {data.object.length > 0 ? (
              data.object.map((item) => (
                <img
                  key={item.documentId}
                  src={item.documentLink}
                  alt={`Car Image ${item.documentId}`}
                  onError={(e) => (e.currentTarget.src = fallbackImage)}
                  className="object-contain w-full h-full"
                />
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
                />
              </div>
            )}
          </Carousel>
        )}

        {exterior && (
          <Carousel className="bg-white rounded-lg shadow-md ">
            {data.object.length > 0 ? (
              data.object.map((item) => (
                <img
                  key={item.documentId}
                  src={item.documentLink}
                  alt={`Car Image ${item.documentId}`}
                  className="object-contain w-full h-full"
                />
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
                />
              </div>
            )}
          </Carousel>
        )}

        {features && (
          <Carousel className="bg-white rounded-lg shadow-md ">
            {data.object.length > 0 ? (
              data.object.map((item) => (
                <img
                  key={item.documentId}
                  src={item.documentLink}
                  alt={`Car Image ${item.documentId}`}
                  className="object-contain w-full h-full"
                />
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
                />
              </div>
            )}
          </Carousel>
        )}

        {tyres && (
          <Carousel className="bg-white rounded-lg shadow-md">
            {data.object.length > 0 ? (
              data.object.map((item) => (
                <img
                  key={item.documentId}
                  src={item.documentLink}
                  alt={`Car Image ${item.documentId}`}
                  className="object-contain w-full h-full"
                />
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
                />
              </div>
            )}
          </Carousel>
        )}

        {engines && (
          <Carousel className="bg-white rounded-lg shadow-md  ">
            {data.object.length > 0 ? (
              data.object.map((item) => (
                <img
                  key={item.documentId}
                  src={item.documentLink}
                  alt={`Car Image ${item.documentId}`}
                  className="object-contain w-full h-full"
                />
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 "
                />
              </div>
            )}
          </Carousel>
        )}
      </div>
    );
  };

  return (
    <div className="w-4/5 md:w-full container md:px-4 lg:px-8">
      <div className="flex flex-col justify-between">
        {/* <div className="max-w-lg mx-auto mb-5"> */}
        <ChooseCarColor />
        {/* </div> */}
        <div className="w-11/12 max-w-xl mx-auto m-5 mb-10 overflow-x-auto scrollbar">
          <div className="flex space-x-4 justify-between">
            {/* <div
              className="mb-8 p-2 bg-cover bg-center text-white h-20 w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Engine})` }}
              onClick={() => { setImg360(true); setInterior(false); setExterior(false); setFeatures(false); setTyres(false); setEngines(false) }}
            >
              <span className="flex items-center font-bold">IMAGE360</span>
            </div> */}
            {/* <div
              className="mb-8 p-2 bg-cover bg-center text-white h-12 md:h-20 w-20 md:w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Exterior})` }}
              onClick={() => {
                setInterior(false);
                setExterior(true);
                setFeatures(false);
                setTyres(false);
                setEngines(false);
              }}
            >
              <span className="flex text-sm md:text-base items-center font-bold">
                EXTERIOR
              </span>
            </div> */}
            {/* <div
              className="mb-8 p-2 bg-cover bg-center text-white h-12 md:h-20 w-20 md:w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Interior})` }}
              onClick={() => {
                setInterior(true);
                setExterior(false);
                setFeatures(false);
                setTyres(false);
                setEngines(false);
              }}
            >
              <span className="flex text-sm md:text-base items-center font-bold">
                INTERIOR
              </span>
            </div> */}
            {/* <div
              className="mb-8 p-2 bg-cover bg-center text-white h-12 md:h-20 w-20 md:w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Features})` }}
              onClick={() => {
                setInterior(false);
                setExterior(false);
                setFeatures(true);
                setTyres(false);
                setEngines(false);
              }}
            >
              <span className="flex text-sm md:text-base items-center font-bold">
                FEATURES
              </span>
            </div> */}
            {/* <div
              className="mb-8 p-2 bg-cover bg-center text-white h-12 md:h-20 w-20 md:w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Tyres})` }}
              onClick={() => {
                setInterior(false);
                setExterior(false);
                setFeatures(false);
                setTyres(true);
                setEngines(false);
              }}
            >
              <span className="flex text-sm md:text-base items-center font-bold">
                TYRES
              </span>
            </div> */}
            {/* <div
              className="mb-8 p-2 bg-cover bg-center text-white h-12 md:h-20 w-20 md:w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Engine})` }}
              onClick={() => {
                setInterior(false);
                setExterior(false);
                setFeatures(false);
                setTyres(false);
                setEngines(true);
              }}
            >
              <span className="flex text-sm md:text-base items-center font-bold">
                ENGINES
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView1;
