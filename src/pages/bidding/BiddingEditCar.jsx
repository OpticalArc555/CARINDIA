
import { useState } from "react";
import React from "react";
import Inputs from "../../forms/Inputs";
import { Textarea } from "@material-tailwind/react";
import {useBiddingcarUpdateMutation} from "../../services/biddingAPI"
import { useParams } from "react-router-dom";


export default function BiddingEditCar() {
  const {  carId } = useParams();
  const [formData, setFormData] = useState({
    //features
    acFeature: false,
    musicFeature: false,
    powerWindowFeature: false,
    rearParkingCameraFeature: false,

    // fields
    brand: "",
    bodyType: "",
    price: "",
    model: "",
    year: "",
    transmission: "",
    color: "",
    city: "",
    fuelType: "",
    kmDriven: "",
    carInsurance: "",
    registration: "",
    description: "",
    safetyDescription: "",
    area: "",
    carStatus: "Active",
    noOfWheels: "",
    ownerSerial: "",
    tyre: "",
    dealer_id: "",
  });

 const [biddingcarUpdate] = useBiddingcarUpdateMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the form data to send to the backend
    const data = {
      acFeature: formData.acFeature,

      musicFeature: formData.musicFeature,

      area: formData.area,

      bodyType: formData.bodyType,

      brand: formData.brand,

      carInsurance: formData.carInsurance,

      carStatus: "ACTIVE",

      city: formData.city,

      color: formData.color,

      description: formData.description,

      fuelType: formData.fuelType,

      kmDriven: formData.kmDriven,

      model: formData.model,

      noOfWheels: formData.noOfWheels,

      ownerSerial: formData.ownerSerial,

      powerWindowFeature: formData.powerWindowFeature,

      price: formData.price,

      rearParkingCameraFeature: formData.rearParkingCameraFeature,

      registration: formData.registration,

      safetyDescription: formData.safetyDescription,

      transmission: formData.transmission,

      tyre: formData.tyre,

      year: formData.year,

      // dealer_id: dealer_id,

      date: "2023-07-19",
    };

    try {
      const res = await biddingcarUpdate({data,carId});
      console.log(res);
    } catch (error) {
      console.log(error)
    }
    console.log(data);
   
  };

  const [mult, setMult] = React.useState([]);

  const handleFileChange = (e) => {
    setMult(Array.from(e.target.files));
  };
  return (
    <div className="flex justify-center">
      <div>
        <form onSubmit={handleSubmit} className="w-[50rem]">
          <div className="flex justify-center">
            <p className="text-3xl font-semibold m-4">Bidding Edit Car</p>
          </div>
          {/* first part */}
          <div className="flex ">
            <div className="w-full">
              <Inputs
                label={"Brand"}
                type={"text"}
                name={"Brand"}
                value={formData.brand}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    brand: event.target.value,
                  })
                }
              />
            </div>

            <div className="ml-2 w-full">
              <Inputs
                label={"model"}
                type={"text"}
                name={"model"}
                value={formData.model}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    model: event.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* second part */}
          <div className="flex">
            <div className="mt-5 w-full">
              <Inputs
                label={"price"}
                type={"number"}
                name={"price"}
                value={formData.price}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    price: event.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 ml-2 w-full">
              <Inputs
                label={"year"}
                type={"number"}
                name={"year"}
                value={formData.year}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    year: event.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* third part */}
          <div className="flex">
           
            <div className="mt-5 w-full">
              <select
                required
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                name="transmission"
                value={formData.transmission}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    transmission: event.target.value,
                  });
                }}
              >
                <option>Transmission</option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>

            <div className="mt-5 ml-2 w-full">
              <select
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                name="bodyType"
                required
                value={formData.bodyType}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    bodyType: event.target.value,
                  });
                }}
              >
                <option>Body Type</option>
                <option>Sedan</option>
                <option>Hatchback</option>
                <option>SUV</option>
                <option>MUV</option>
                <option>Coupe</option>
                <option>Convertibles</option>
                <option>Pickup Trucks</option>
              </select>
            </div>
          </div>

          {/* fourth part */}
          <div className="flex">
            <div className="mt-5 w-full">
              <Inputs
                label={"Color"}
                type={"text"}
                name={"color"}
                value={formData.color}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    color: event.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 ml-2 w-full">
              <Inputs
                label={"Owner Serial"}
                type={"number"}
                name={"ownerSerial"}
                value={formData.type}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    ownerSerial: event.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* fifth part */}
          <div className="flex">
            <div className="mt-5 w-full">
              <Inputs
                label={"Registration"}
                type={"text"}
                name={"registration"}
                value={formData.registration}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    registration: event.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 ml-2 w-full">
              <select
                required
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                name="msalary"
                value={formData.carInsurance}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    carInsurance: event.target.value,
                  });
                }}
              >
                <option>Car Insurance</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

          {/* sixth part */}
          <div className="flex">
            <div className="mt-5 w-full">
              <Inputs
                label={"Km Driven"}
                type={"number"}
                name={"kmDriven"}
                value={formData.kmDriven}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    kmDriven: event.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 ml-2 w-full">
              <select
                required
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                name="fuelType"
                value={formData.fuelType}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    fuelType: event.target.value,
                  });
                }}
              >
                <option>Fuel Type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Bio-Fuel</option>
              </select>
            </div>
          </div>

          {/* seventh part */}
          <div className="flex">
            <div className="mt-5 w-full">
              <Inputs
                label={"No Of Wheels"}
                type={"number"}
                name={"noOfWheels"}
                value={formData.noOfWheels}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    noOfWheels: event.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 ml-2 w-full">
              <Inputs
                label={"Tyre"}
                type={"text"}
                name={"tyre"}
                value={formData.tyre}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    tyre: event.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* eight part */}

          <div className="flex">
            <div className="mt-5 w-full">
              <Inputs
                label={"City"}
                type={"text"}
                name={"city"}
                value={formData.city}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    city: event.target.value,
                  })
                }
              />
            </div>
            <div className="mt-5 ml-2 w-full">
              <Inputs
                label={"Area"}
                type={"text"}
                name={"area"}
                value={formData.area}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    area: event.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* ninth part */}
          <div className="flex">
            <div className="mt-5 ml-5">
              <input
                label={"Music Feature"}
                type={"checkbox"}
                name={"musicFeature"}
                value={formData.musicFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    musicFeature: event.target.value,
                  })
                }
              />{" "}
              Music
            </div>

            <div className="mt-5 ml-5">
              <input
                label={"Power Window Feature"}
                type={"checkbox"}
                name={"powerWindowFeature"}
                value={formData.powerWindowFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    powerWindowFeature: event.target.value,
                  })
                }
              />{" "}
              Power Windows
            </div>

            <div className="mt-5 ml-5">
              <input
                label={"Ac Feature"}
                type={"checkbox"}
                name={"acFeature"}
                value={formData.acFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    acFeature: event.target.value,
                  })
                }
              />{" "}
              Air Conditioning
            </div>

            <div className="mt-5 ml-5">
              <input
                label={"Rear Parking Camera Feature"}
                type={"checkbox"}
                name={"rearParkingCameraFeature"}
                value={formData.rearParkingCameraFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    rearParkingCameraFeature: event.target.value,
                  })
                }
              />{" "}
              Rear Parking Camera
            </div>
          </div>

          {/* tenth part */}

          <div className="mt-5">
          <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      <div>
        {mult.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Image ${index + 1}`}
            style={{ maxWidth: '500px', maxHeight: '500px', margin: '5px' }}
          />
        ))}
      </div>
          </div>

          {/* eleventh part */}

          <div className="mt-5">
            <h4>Vehicle Description</h4>
            <div className="formrow">
              <Textarea
                required
                className="form-control"
                name="description"
                placeholder="Vehicle Description"
                value={formData.description}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    description: event.target.value,
                  });
                }}
              ></Textarea>
            </div>
          </div>
          {/* twelth part */}

          <div className="mt-5">
            <h4>Safety Description</h4>
            <div className="formrow">
              <Textarea
                required
                className="form-control"
                name="safetyDescription"
                placeholder="Safety Description"
                value={formData.safetyDescription}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    safetyDescription: event.target.value,
                  });
                }}
              ></Textarea>
            </div>
          </div>

          <button
            type="submit"
            className="p-3 bg-indigo-400 rounded-md w-28 text-white"
            value="Add  Car"
          >
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
