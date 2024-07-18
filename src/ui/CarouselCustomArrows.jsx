// import { Carousel, IconButton } from "@material-tailwind/react";
import { useGetCarImageByIdQuery } from "../services/carAPI";

// eslint-disable-next-line react/prop-types
export function CarouselCustomArrows({ carId }) {
  console.log("Carid in customearrow", carId);
  const { data, isLoading, error } = useGetCarImageByIdQuery({ carId });
  console.log("Data of image", data);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-5">
        No Image Available{" "}
        <img
          className="h-[15rem] w-[19rem]  opacity-50"
          src="..\..\cars\no-image-available.png"
          alt="no image"
        />
      </div>
    );

  return (
    <>
      {/* // <Carousel */}
      {/* //   className="rounded-xl md:w-56 lg:w-72"
      // prevArrow={({ handlePrev }) => ( 
      //   <IconButton
      //     variant="text"
      //     color="white"
      //     size="lg"
      //     onClick={handlePrev}
      //     className="!absolute top-2/4 left-4 -translate-y-2/4"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={2}
      //       stroke="currentColor"
      //       className="h-6 w-6"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      //       />
      //     </svg>
      //   </IconButton>
      // )}
    //   nextArrow={({ handleNext }) => (
    //     <IconButton
    //       variant="text"
    //       color="white"
    //       size="lg"
    //       onClick={handleNext}
    //       className="!absolute top-2/4 !right-4 -translate-y-2/4"
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={2}
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    //         />
    //       </svg>
    //     </IconButton>
    //   )}
    // >*/}

      {data &&
        data.object.map((item) =>
          item.documentType === "coverImage" ? (
            <img
              key={item.documentId}
              src={item.documentLink}
              alt={`Car Image ${item?.documentId}`}
              // className="rounded-lg md:w-[19rem] h-[15rem]"
              className="rounded-lg h-[15rem] w-[19rem]"
            />
          ) : null
        )}

      {/* // </Carousel> */}
    </>
  );
}
