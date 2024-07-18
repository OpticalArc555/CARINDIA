import CardUi from "../../ui/CardUi";
import { Carousel } from "@material-tailwind/react";
import { RiSteering2Fill } from "react-icons/ri";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { FaBluetooth } from "react-icons/fa6";
import { FaAirbnb } from "react-icons/fa";
import { TbShieldLockFilled } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

const TopFeatures = () => {
  return (
    <>
      <div className="text-2xl text-black font-bold my-6 ml-12 font-[Merriweather]">
        Top Features
      </div>
      <CardUi>
        <div className="w-full md:w-full md:flex gap-7">
          <div className="w-3/4 md:w-1/2 md:h-52">
            <Carousel
              className="rounded-xl"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              <img
                src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <img
                src="https://media.istockphoto.com/id/146917964/photo/mannequin-in-a-car.jpg?s=2048x2048&w=is&k=20&c=LsAnu76us78Ae6cM0z_QqD1izPXEjAd8ehbBc9JEuzo="
                alt="image 2"
                className="h-full w-full object-cover"
              />
              <img
                src="https://media.istockphoto.com/id/531868882/photo/starting-the-car-engine.jpg?s=2048x2048&w=is&k=20&c=tYYKtOLf2WDrX4QYjMIaxKNP77NPDkFRlUeg4McqhVc="
                alt="image 3"
                className="h-full w-full object-cover"
              />
            </Carousel>
          </div>
          <div className="md:w-1/2 flex flex-col">
            <div className="flex">
              <RiSteering2Fill className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Steering Mounted Controls
              </div>
            </div>
            <div className="flex mt-5">
              <IoRadioButtonOnSharp className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Push Button Start
              </div>
            </div>
            <div className="flex mt-5">
              <FaBluetooth className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Bluetooth Campatibility
              </div>
            </div>
            <div className="flex mt-5">
              <FaAirbnb className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                Airbags
              </div>
            </div>
            <div className="flex mt-5">
              <TbShieldLockFilled className="w-[1.5rem] h-[1.5rem] ml-3 mr-5" />
              <div className="font-semibold text-black font-[latto] text-lg">
                ABS - Anti-lock Braking System
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-3/4 justify-center items-center mt-12 md:w-full">
          <div className="flex gap-2 px-10 py-2 md:px-20 md:py-3 items-center bg-[#002441] text-white text-sm rounded-2xl uppercase font-[latto] ">
            <div>View Inspection Report</div>
            <div>
              <IoIosArrowForward
                className="w-[1.2rem] h-[1.5rem]"
                color="white"
              />
            </div>
          </div>
        </div>
      </CardUi>
    </>
  );
};

export default TopFeatures;
