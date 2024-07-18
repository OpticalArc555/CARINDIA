/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { useGetbeadingCarImageQuery } from "../../services/biddingAPI";

// eslint-disable-next-line react/prop-types
const BiddingCarView1 = ({ beadingCarId }) => {
  // const [img360, setImg360] = useState(true);
  const [interior, setInterior] = useState(false);
  const [exterior, setExterior] = useState(true);
  const [features, setFeatures] = useState(false);
  const [tyres, setTyres] = useState(false);
  const [engines, setEngines] = useState(false);

  const { data, isLoading, error } = useGetbeadingCarImageQuery(beadingCarId);

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

  const fallbackImage = "..\\..\\cars\\no-image-available.png";

  const ChooseCarColor = () => {
    return (
      <div className="container mx-auto w-full md:w-3/4 md:h-[30rem]">
        {interior && (
          <Carousel
            className="bg-white rounded-lg shadow-md"
            arrowClassName="custom-arrow"
            prevButtonOptions={{ style: { backgroundColor: '#000000' } }}
            nextButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
          >
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
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50"
                />
              </div>
            )}
          </Carousel>
        )}
        {exterior && (
          <Carousel
            className="bg-white rounded-lg shadow-md"
            arrowClassName="custom-arrow"
            prevButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
            nextButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
          >
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
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50"
                />
              </div>
            )}
          </Carousel>
        )}

        {features && (
          <Carousel
            className="bg-white rounded-lg shadow-md"
            arrowClassName="custom-arrow"
            prevButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
            nextButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
          >
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
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50"
                />
              </div>
            )}
          </Carousel>
        )}

        {tyres && (
          <Carousel
            className="bg-white rounded-lg shadow-md"
            arrowClassName="custom-arrow"
            prevButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
            nextButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
          >
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
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50"
                />
              </div>
            )}
          </Carousel>
        )}

        {engines && (
          <Carousel
            className="bg-white rounded-lg shadow-md"
            arrowClassName="custom-arrow"
            prevButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
            nextButtonOptions={{ style: { backgroundColor: '#4a5568' } }}
          >
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
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8"
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
        <ChooseCarColor />
        <div className="w-11/12 max-w-xl mx-auto m-5 mb-10 overflow-x-auto scrollbar">
          <div className="flex space-x-4 justify-between"></div>
        </div>
      </div>
    </div>
  );
};

export default BiddingCarView1;
