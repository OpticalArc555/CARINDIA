// import { Carousel, IconButton } from "@material-tailwind/react";
import { useGetCarImageByIdQuery } from "../services/carAPI";

// eslint-disable-next-line react/prop-types
export function CarouselCustomArrows({ carId }) {
 
  const { data, isLoading, error } = useGetCarImageByIdQuery({ carId });
  
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-5">
        {" "}
        <img
          className="h-[14rem] w-[19rem] p-[20px]  opacity-50"
          src="..\..\cars\no-image-available.png"
          alt="no image"
        />
      </div>
    );

  return (
    <>
      {data &&
        data.object.map((item) =>
          item.documentType === "coverImage" ? (
            <img
              key={item.documentId}
              src={item.documentLink}
              alt={`Car Image ${item?.documentId}`}
              className="rounded-lg h-[15rem] w-[19rem]"
            />
          ) : null
        )}

      {/* // </Carousel> */}
    </>
  );
}
