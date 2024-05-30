/* eslint-disable no-unused-vars */
import { useState } from 'react';
import ThreeSixty from "react-360-view";
import { Card, Carousel } from '@material-tailwind/react';

import Exterior from '/cars/Exterior.webp';
import Interior from '../Img_UI/Interior.webp';
import Features from '../Img_UI/Features.webp';
import Tyres from '../Img_UI/Tyres.webp';
import Engine from '../Img_UI/Engine.webp';

import i1 from '../Img_UI/Interior_Img/i1.webp';
import i2 from '../Img_UI/Interior_Img/i2.webp';
import i3 from '../Img_UI/Interior_Img/i3.webp';
import i4 from '../Img_UI/Interior_Img/i4.webp';
import i5 from '../Img_UI/Interior_Img/i5.webp';
import i6 from '../Img_UI/Interior_Img/i6.webp';

import e1 from '../Img_UI/Exterior_Img/e1.webp';
import e2 from '../Img_UI/Exterior_Img/e2.webp';
import e3 from '../Img_UI/Exterior_Img/e3.webp';
import e4 from '../Img_UI/Exterior_Img/e4.webp';
import e5 from '../Img_UI/Exterior_Img/e5.webp';
import e6 from '../Img_UI/Exterior_Img/e6.webp';

import f1 from '../Img_UI/Features_Img/f1.webp';
import f2 from '../Img_UI/Features_Img/f2.webp';
import f3 from '../Img_UI/Features_Img/f3.webp';

import t1 from '../Img_UI/Tyres_Img/t1.webp';
import t2 from '../Img_UI/Tyres_Img/t2.webp';
import t3 from '../Img_UI/Tyres_Img/t3.webp';
import t4 from '../Img_UI/Tyres_Img/t4.webp';
import t5 from '../Img_UI/Tyres_Img/t5.webp';

import en1 from '../Img_UI/Engines_Img/en1.webp';
import en2 from '../Img_UI/Engines_Img/en2.webp';
import en3 from '../Img_UI/Engines_Img/en3.webp';

const CarView1 = () => {
  // const [img360, setImg360] = useState(true);
  const [interior, setInterior] = useState(false);
  const [exterior, setExterior] = useState(true);
  const [features, setFeatures] = useState(false);
  const [tyres, setTyres] = useState(false);
  const [engines, setEngines] = useState(false);
  console.log(exterior);

  const interiorImages = [i1, i2, i3, i4, i5, i6];
  const exteriorImages = [e1, e2, e3, e4, e5, e6];
  const featuresImages = [f1, f2, f3];
  const tyresImages = [t1, t2, t3, t4, t5];
  const enginesImages = [en1, en2, en3];

  const renderImagesCarousel = (imagesArray) => {
    return (
      <Carousel autoplay="true">
        {imagesArray.map((imageUrl, index) => (
          <div key={index}>
            <img
              className="object-cover w-full h-64 sm:h-80 md:h-96"
              src={imageUrl}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    );
  };

  const ChooseCarColor = () => {
    return (
      <div className="container mx-auto">
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
          <Card className="bg-white rounded-lg overflow-hidden shadow-md">
            {renderImagesCarousel(interiorImages)}
          </Card>
        )}

        {exterior && (
          <Card className="bg-white rounded-lg overflow-hidden shadow-md">
            {renderImagesCarousel(exteriorImages)}
          </Card>
        )}

        {features && (
          <Card className="bg-white rounded-lg overflow-hidden shadow-md">
            {renderImagesCarousel(featuresImages)}
          </Card>
        )}

        {tyres && (
          <Card className="bg-white rounded-lg overflow-hidden shadow-md">
            {renderImagesCarousel(tyresImages)}
          </Card>
        )}

        {engines && (
          <Card className="bg-white rounded-lg overflow-hidden shadow-md">
            {renderImagesCarousel(enginesImages)}
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between">
        <div className="max-w-lg mx-auto mb-5">
          <ChooseCarColor />
        </div>
        <div className="max-w-lg mx-auto m-5 mb-10 overflow-x-auto scrollbar">
          <div className="flex space-x-4 justify-between">
            {/* <div
              className="mb-8 p-2 bg-cover bg-center text-white h-20 w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Engine})` }}
              onClick={() => { setImg360(true); setInterior(false); setExterior(false); setFeatures(false); setTyres(false); setEngines(false) }}
            >
              <span className="flex items-center font-bold">IMAGE360</span>
            </div> */}
            <div
              className="mb-8 p-2 bg-cover bg-center text-white h-20 w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Exterior})` }}
              onClick={() => {  setInterior(false); setExterior(true); setFeatures(false); setTyres(false); setEngines(false) }}
            >
              <span className="flex items-center font-bold">EXTERIOR</span>
            </div>
            <div
              className="mb-8 p-2 bg-cover bg-center text-white h-20 w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Interior})` }}
              onClick={() => {  setInterior(true); setExterior(false); setFeatures(false); setTyres(false); setEngines(false) }}
            >
              <span className="flex items-center font-bold">INTERIOR</span>
            </div>
            <div
              className="mb-8 p-2 bg-cover bg-center text-white h-20 w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Features})` }}
              onClick={() => {  setInterior(false); setExterior(false); setFeatures(true); setTyres(false); setEngines(false) }}
            >
              <span className="flex items-center font-bold">FEATURES</span>
            </div>
            <div
              className="mb-8 p-2 bg-cover bg-center text-white h-20 w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Tyres})` }}
              onClick={() => {  setInterior(false); setExterior(false); setFeatures(false); setTyres(true); setEngines(false) }}
            >
              <span className="flex items-center font-bold">TYRES</span>
            </div>
            <div
              className="mb-8 p-2 bg-cover bg-center text-white h-20 w-28 rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${Engine})` }}
              onClick={() => {  setInterior(false); setExterior(false); setFeatures(false); setTyres(false); setEngines(true) }}
            >
              <span className="flex items-center font-bold">ENGINES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView1;
