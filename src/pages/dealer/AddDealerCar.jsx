import { useState } from "react";
import Inputs from "../../forms/Inputs";
import { Textarea, Input } from "@material-tailwind/react";
// import React from "react";
import { useCarRegisterMutation } from "../../services/carAPI";
import { useNavigate, useParams } from "react-router";

const carData = {
  Kia: ["Sonet", "Seltos", "Carnival"],
  Volkswagen: ["Polo", "Vento", "Taigun", "Virtus"],
  Mahindra: ["XUV300", "XUV301", "XUV302", "XUV303", "XUV304", "XUV305", "XUV306", "XUV307", "XUV308", "XUV700", "XUV701",
    "XUV702", "XUV703", "Thar", "Scorpio", "Bolero", "Marazzo"],
  MarutiSuzuki: ["Swift", "Baleno", "Vitara Brezza", "Ertiga", "Alto K10", "Dzire", "Wagon R", "XL6", "Celerio", "Jimny",
  "Ignis", "Eeco", "Invicto", "Ciaz",],
  Citroen: ["C3", "C3 Aircross", "eC3", "C5 Aircross"],
  Tata: ["Tigor", "Altroz", "Harrier", "Safari", "Hexa", "Tigor EV", "Nexon EV", "Punch"],
  
  Hyundai: ["Verna", "i20", "Venue", "Creta", "Santro", "Grand i10 Nios", "Aura", "Exter", "Alcazar"],
  Honda: ["City", "Amaze", "WR-V"],
  BMW: ["3 Series", "5 Series", "X1", "X3", "X5", "7 Series", "X7", "iX1", "i4", "i7", "i5", "iX1", "XM", "BMW M340i", "2 Series Gran Coupe", "M4"],
  Toyota: [],
  ISUZU: [],
  Skoda: [],
  LandRover: ["Discovery","Range Rover Sport","Discovery Sport","Range Rover","Defender","Range Rover Velar","Range Rover Evoque",""],
  Fiat: [],
  Nissan: [],
  Volvo: [],
  AstonMartin: [],
  McLaren: [],
  Ferrari: [],
  Maserati: [],
  MINI: [],
  Bugatti: [],
  ForceMotors: ["Trax Cruiser"],
  Force: ["Gurkha"],
  Bentley: ["Bentayga", "Flying Spur", "Continental"],
  Audi: ["e-tron","Q8","A8L","RS Q8","RS5","Q5","A6","Q7","S5","e-tron GT","Q3 Sportback","Q3","A4"],
  Porsche: ["911","Taycan","Macan","Cayenne","Panamera","718","Taycan Cross Turismo","Cayenne Coupe","Macan Turbo EV"],
  MercedesBenz: ["EQC","AMG GT","AMG G-Class","AMG E-Class","AMG C-Class","S-Class Coupe","C-Class Coupe","E-Class Coupe","GLS","GLE","GLC","GLB","GLA","S-Class","E-Class","C-Class","A-Class Limousine"],
  Others: [],
};

const cityOptions = {
  Pune: ["MH-12"],
  PimpriChichwad: ["MH-14"],
  Mumbai: ["MH-01", "MH-02", "MH-03", "MH-47"],
  Amravati: ["MH-27"],
  Yavatmal: ["MH-29"],
  Chandrapur: ["MH-34"],
  Kolhapur: ["MH-09"],
  Solapur: ["MH-13", "MH-45"],
  Nanded: ["MH-32"],
  Latur: ["MH-32"],
  Satara: ["MH-11"],
  Sangli: ["MH-10"],
  Nashik: ["MH-15", "MH-51"],
  Beed: ["MH-32"],
  Jalna: ["MH-32"],
  Nagpur: ["MH-31", "MH-49  "],
  Gondia: ["MH-35"],
  Gadchiroli: ["MH-33"],
  Bhandara: ["MH-36"],
  Washim: ["MH-37"],
  Jalgaon: ["MH-19"],
  Akola: ["MH-30"],
  Buldhana: ["MH-28"],
  Dhule: ["MH-18"],
  Nandurbar: ["MH-39"],
  Thane: ["MH-04", "MH-05", "MH-48"],
  Raigad: ["MH-06"],
  Ratnagiri: ["MH-08"],
  Sindhudurg: ["MH-07"],
  Ahmednagar: ["MH-16"],
  Dharashiv: ["MH-25"],
  SambhajiNagar: ["MH-20"],
};

export default function AddDealerCar() {
  const [carRegister] = useCarRegisterMutation();
  //  const [mult, setMult] = React.useState([]);
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
    title: "",
    area: "",
    carStatus: "Active",
    ownerSerial: "",
    dealer_id: "",
    cVariant : "",
    carInsuranceDate :""
  });
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const date = new Date(); // Create a new Date object with the current date
  const year = date.getFullYear(); // Get the year (e.g., 2024)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so add 1), pad with leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Get the day of the month, pad with leading zero if needed

  const formattedDate = `${year}-${month}-${day}`;


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the form data to send to the backend
    const data = {
      acFeature: formData.acFeature,

      musicFeature: formData.musicFeature,

      area: formData.area,

      brand: formData.brand,

      carInsurance: formData.carInsurance,

      carStatus: "ACTIVE",

      city: formData.city,

      color: formData.color,

      description: formData.description,

      fuelType: formData.fuelType,

      kmDriven: formData.kmDriven,

      model: formData.model,

      ownerSerial: formData.ownerSerial,

      powerWindowFeature: formData.powerWindowFeature,

      price: formData.price,

      rearParkingCameraFeature: formData.rearParkingCameraFeature,

      registration: formData.registration,

      transmission: formData.transmission,
      
      title: formData.title,

      variant : formData.cVariant ,

      carInsuranceDate :formData.carInsuranceDate ,

      year: formData.year,

      dealer_id: id,

      date: formattedDate,
    };

    const res = await carRegister(data);

    if (res?.data?.status === "success") {
      alert("Car added");
      navigate(`/dealer/${id}/uploadimage`); // Corrected URL string with backticks (`) for interpolation
    }
  };

  //Two field Brands and Model
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  //const [formDataC, setFormDataC] = useState({ carInsurance: "" });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setModelOptions(carData[brand] || []);
    setFormData({
      ...formData,
      brand,
      model: "", // Reset model when brand changes
    });
  };
  //End Brands and Model
  // Model Change
  const handleModelChange = (event) => {
    const model = event.target.value;
    setFormData({
      ...formData,
      model,
    });
  };

  // City Change
  const handleCityChange = (event) => {
    const city = event.target.value;
    setFormData({ ...formData, city, registration: "" });
  };

  // Car Insurance ValidDate
  const handleChange = (event) => {
    const value = event.target.value === 'true';
    setFormData((prevFormData) => ({
      ...prevFormData,
      carInsurance: value,
    }));
    setShowCalendar(value);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      insurancedate: value,
    }));
  };

  return (
    <div className="md:flex justify-center m-6 md:m-0">
      <div>
        <form onSubmit={handleSubmit} className="w-full md:w-[50rem]">
          <div className="flex justify-center">
            <p className="text-3xl font-semibold m-4">Add Dealer Car</p>
          </div>
          {/* first part */}
          <div className="md:flex gap-2">
            <div className="mt-5 w-full">
              <select
                required
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                value={selectedBrand}
                onChange={handleBrandChange}
              >
                <option value="">Brands</option>
                {Object.keys(carData).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 w-full">
              <select
                required
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                value={formData.model}
                onChange={handleModelChange}
                disabled={!selectedBrand}
              >
                <option value="">Models</option>
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* second part */}
          <div className="md:flex">
            <div className="mt-5 w-full">
              <select
              className="w-full border-2 border-gray-400 p-2 rounded-md"
                label={"Car Variant"}
                type={"text"}
                name={"cVariant"}
                value={formData.cVariant}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    cVariant: event.target.value,
                  })
                }
              >
              <option>Select variant</option>
              <option>HTE 1.2</option>
              <option>HTK 1.2</option>
              <option>HTK+ 1.2</option>
              <option>HTX 1.2</option>
              <option>HTX+ 1.2</option>
              <option>GTX+ 1.0 Turbo</option>
              <option>GTX+ 1.5 Diesel</option>
              <option>HTE</option>
              <option>HTK</option>
              <option>HTK+</option>
              <option>HTX</option>
              <option>GTX</option>
              <option>GTX+</option>
              <option>GTX+ Diesel</option>
              <option>Premium</option>
              <option>Prestige</option>
              <option>Limousine</option>
              <option>Trendline 1.0L</option>
              <option>Comfortline 1.0L</option>
              <option>Highline Plus 1.0L</option>
              <option>GT 1.0L</option>
              <option>Highline 1.0L</option>
              <option>Highline 2.0L</option>
              <option>Dynamic 1.0L</option>
              <option>PerformanceLine 1.5L</option>
              <option>W4</option>
              <option>W6</option>
              <option>W8</option>
              <option>W8(0)</option>
              <option>W8(0)Sportz</option>
              <option>W8(0)Dual Tone</option>
              <option>W8(0)Sportz Dual Tone</option>
              <option>W8(0)AMT</option>
              <option>W8(0)AMT Dual Tone</option>
              <option>AX3</option>
              <option>AX5</option>
              <option>AX7</option>
              <option>AX7 L</option>
              <option>AX OPT 4-Str Convertible Top</option>
              <option>LX 4-Str Convertible Top</option>
              <option>LX 4-Str Hard Top</option>
              <option>S3 Plus 2.0 4WD 7S</option>
              <option>S5 2.0 7S</option>
              <option>S7 2.0 7S</option>
              <option>S9 2.0 4WD 7S</option>
              <option>S11 2.0 4WD 7S</option>
              <option>B2</option>
              <option>B4</option>
              <option>B6 Opt</option>
              <option>B6</option>
              <option>B6 Opt Dual Tone</option>
              <option>M2</option>
              <option>M4</option>
              <option>LXI</option>
              <option>VXI</option>
              <option>ZXI</option>
              <option>ZXI AMT</option>
              <option>VXI AT</option>
              <option>VXI+ AT</option>
              <option>ZXI+</option>
              <option>ZXI+ Dual</option>
              <option>ZXI+ Dual Tone</option>
              <option>ZXI+ AMT</option>
              <option>ZXI+ AMT Dual Tone</option>
              <option>Sigma</option>
              <option>Sigma MT</option>
              <option>Delta</option>
              <option>Delta MT</option>
              <option>Delta AT</option>
              <option>Zeta</option>
              <option>Zeta MT</option>
              <option>Zeta AT</option>
              <option>Zeta AMT</option>
              <option>Alpha</option>
              <option>Alpha MT</option>
              <option>Alpha AT</option>
              <option>Alpha AMT</option>
              <option>VXI AT</option>
              <option>ZXI AT</option>
              <option>ZXI+ AT</option>
              <option>ZXI+ Dual Tone AT</option>
              <option>XE</option>
              <option>XM</option>
              <option>XT</option>
              <option>XZ</option>
              <option>XZ+</option>
              <option>XMA</option>
              <option>XZA</option>
              <option>XZA+</option>
              <option>XZ+ Dual</option>
              <option>XZ+ AMT</option>
              <option>XZ+ AMT</option>
              <option>XZ+ DT</option>
              <option>XZA DT</option>
              <option>Gold</option>
              <option>XT+</option>
              <option>Adventure</option>
              <option>XTA</option>
              <option>XT 4*4</option>
              <option>XTA 4*4</option>
              <option>XTA 4*4</option>
              <option>XZ Lux</option>
              <option>Pure iCNG</option>
              <option>Adventure Rhythm Pack MT</option>
              <option>Adventure AMT</option>
              <option>Accomplished MT</option>
              <option>Accomplished Dazzle Pack MT</option>
              <option>Accomplished MT Sunroof</option>
              <option>Accomplished AMT</option>
              <option>Accomplished AMT Sunroof</option>
              <option>Accomplished Dazzle MT Sunroof</option>
              <option>Accomplished Dazzle AMT Sunroof</option>
              <option>Accomplished Dazzle Pack AMT</option>
              <option>Accomplished iCNG</option>
              <option>Accomplished Dazzle Sunroof CNG</option>
              <option>Adventure iCNG</option>
              <option>Adventure Dazzle iCNG</option>
              <option>Creative</option>
              <option>Creative AMT</option>
              <option>Creative Flagship MT</option>
              <option>Creative Flagship Dual Tone AMT</option>
              <option>Creative Dual Tone MT Sunroof</option> 
              <option>Creative Dual Tone AMT</option> 
              <option>Creative Dual Tone AMT Sunroof</option> 
              <option>LDI</option> 
              <option>VDI</option> 
              <option>ZDI</option> 
              <option>ZDI+</option> 
              <option>VDI AT</option> 
              <option>VDI AGS</option> 
              <option>ZDI+ AT</option> 
              <option>ZDI AGS</option> 
              <option>ZDI+ Dual</option> 
              <option>LXI (0)</option> 
              <option>VXI</option> 
              <option>VXI (0)</option> 
              <option>VXI AMT</option> 
              <option>VXI CNG</option> 
              <option>VXI AMT (0)</option> 
              <option>VXI AGS</option> 
              <option>ZXI CNG</option> 
              <option>ZXI AGS</option> 
              <option>ZXI+</option> 
              <option>ZXI+ AGS</option> 
              <option>ZXI AMT</option> 
              <option>STD</option> 
              <option>STD (0)</option> 
              <option>Zeta MT Petrol</option> 
              <option>Zeta AT Petrol</option> 
              <option>Zeta MT CNG</option> 
              <option>Alpha MT Petrol</option> 
              <option>Alpha AT Petrol</option> 
              <option>Alpha AT</option> 
              <option>Alpha MT Dual Tone</option> 
              <option>Alpha Plus MT Petrol</option> 
              <option>Alpha Plus AT Petrol</option> 
              <option>Alpha Plus AT Petrol Dual Tone</option> 
              <option>Alpha Plus MT Petrol Dual Tone</option> 
              <option>5 Seater Standard</option> 
              <option>7 Seater Standard</option> 
              <option>Cargo Standard</option> 
              <option>Cargo CNG</option> 
              <option>5 Seater AC</option> 
              <option>5 Seater CNG</option> 
              <option>Tour V 5 Seater AC</option> 
              <option>Tour V 5 Seater CNG</option> 
              <option>Zeta+ 7 Seater</option> 
              <option>Alpha+ 7 Seater</option> 
              <option>Alpha+ 8 Seater</option> 
              <option>A 200</option> 
              <option>A 200d</option> 
              <option>C 200</option> 
              <option>C 200d</option> 
              <option>E 200</option> 
              <option>E 220d</option> 
              <option>E 350d</option> 
              <option>S 350d</option> 
              <option>S 400d</option> 
              <option>S 450</option> 
              <option>GLA 200</option> 
              <option>GLA 220d</option> 
              <option>GLB 200</option> 
              <option>GLB 201</option> 
              <option>GLB 220d</option> 
              <option>GLB 250</option> 
              <option>GLB 35 AMG</option> 
              <option>GLC 200</option> 
              <option>GLB 201</option> 
              <option>GLC 220d</option> 
              <option>GLC 300</option> 
              <option>GLC 301</option> 
              <option>GLC 43 AMG</option> 
              <option>GLC 53 AMG</option> 
              <option>GLE 350</option> 
              <option>GLE 351</option> 
              <option>GLE 400d</option> 
              <option>GLE 450 AMG</option> 
              <option>GLS 450</option> 
              <option>GLS 451</option> 
              <option>GLS 580</option> 
              <option>GLS 581</option> 
              <option>GLS 400d</option> 
              <option>C 200 Coupe</option> 
              <option>C 300 Coupe</option> 
              <option>AMG C 43 Coupe</option> 
              <option>AMG E 53 Coupe</option> 
              <option>AMG E 63 Coupe</option> 
              <option>Coupe 200 Coupe</option> 
              <option>Coupe 300 Coupe</option> 
              <option>S 450 Coupe</option> 
              <option>S 560 Coupe</option> 
              <option>AMG S 63 Coupe</option> 
              <option>AMG S 65 Coupe</option> 
              <option>A 35</option> 
              <option>A 36</option> 
              <option>C 63</option> 
              <option>C 64</option> 
              <option>C 64 S</option> 
              <option>E 63</option> 
              <option>E 64</option> 
              <option>E 63 S</option> 
              <option>G 63</option> 
              <option>G 64</option> 
              <option>GT</option> 
              <option>GT S</option> 
              <option>GT C</option> 
              <option>GT R</option> 
              <option>GT R Pro</option> 
              <option>GT Black Series</option> 
              <option>EQC 400</option> 
              <option>SE R-Dynamic Petrol</option> 
              <option>SE R-Dynamic Diesel</option> 
              <option>HSE Dynamic 2.0 Petrol</option> 
              <option>HSE Dynamic 2.0 Diesel</option> 
              <option>110 SE 2.0 Petrol</option> 
              <option>110 HSE 2.0 Petrol</option> 
              <option>90 HSE 2.0 Petrol</option> 
              <option>90 X-Dynamic HSE 2.0 Petrol</option> 
              <option>SE 3.0 Petrol</option> 
              <option>SE 3.0 Diesel</option> 
              <option>SE 4.4 Petrol</option> 
              <option>SE LWB 3.0 Petrol</option> 
              <option>SE Dynamic 3.0 Petrol</option> 
              <option>SE Dynamic 3.0 Diesel</option> 
              <option>HSE Dynamic 3.0 Diesel</option> 
              <option>HSE Dynamic 3.0 Petrol</option> 
              <option>S 2.0 Petrol</option> 
              <option>S 3.0 Petrol</option> 
              <option>HSE R-Dynamic 2.0 Petrol</option> 
              <option>Carrera</option> 
              <option>Carrera T</option> 
              <option>Carrera Cabriolet</option> 
              <option>Carrera S</option> 
              <option>RWD</option> 
              <option>4S</option> 
              <option>GTS</option> 
              <option>Turbo</option> 
              <option>Base</option> 
              <option>S</option> 
              <option>S</option> 
              <option>G3</option> 
              <option>Cayman</option> 
              <option>Cayman Style Edition</option> 
              <option>Boxster</option> 
              <option>Boxster Style Edition</option> 
              <option>Taycan Cross 4S</option> 
              <option>Taycan Cross Turbo</option> 
              <option>Taycan Cross Turbo S</option> 
              <option>Electric SUV</option> 
              <option>Premium 40 TFSI</option> 
              <option>Premium Plus 45 TFSI</option> 
              <option>Premium Plus 40 TFSI</option> 
              <option>Technology 40 TFSI</option> 
              <option>40 TFSI Premium</option> 
              <option>40 TFSI Premium Plus</option> 
              <option>Bold Edition</option> 
              <option>Technology Plus S-line</option> 
              <option>RS</option> 
              <option>S5 Sportback 3.0 TFSI</option> 
              <option>Premium Plus 55 TFSI</option> 
              <option>Technology 55 TFSI w/o Matrix</option> 
              <option>Technology 45 TFSI w/o Matrix</option> 
              <option>Technology 55 TFSI</option> 
              <option>Technology 45 TFSI</option> 
              <option>Celebration</option> 
              <option>Celebration Edition</option> 
              <option>55 TFSI quattro</option> 
              <option>Sportback</option> 
              <option>Sportback e-tron</option> 
              <option>4.0L TFSI</option> 
              <option>Technology</option> 
              <option>e-tron</option> 
              <option>Audi 50</option> 
              <option>Audi 55</option> 
              <option>Audi 55 Technology</option> 
              <option>GT V8</option> 
              <option>GTC V8</option> 
              <option>GT S V8</option> 
              <option>GT Azure V8</option> 
              <option>GT Speed</option> 
              <option>V6 Hybrid</option> 
              <option>V8</option> 
              <option>V8 Hybrid</option> 
              <option>S V8</option> 
              <option>S Hybrid</option> 
              <option>EWB</option> 
              <option>S</option> 
              <option>Azure</option> 
              <option>EWB Azure</option> 
              <option>3 Door</option> 
              <option>5 Door</option> 
              <option>9 STR</option> 
              <option>9 STR AC</option> 
              <option>12 STR</option> 
              <option>12 STR AC</option> 
              <option>Divo W16</option> 
              <option>Veyron 16.4 Grand Sport</option> 
              <option>Cooper S</option> 
              <option>Cooper S (Steptronic Sport)</option> 
              <option>Countryman Cooper S JCW Inspired</option> 
              <option>Cooper SE 3-Door</option> 
              <option>Cooper SE Charged Edition</option> 
              <option>GT Hybrid</option> 
              <option>Modena S</option> 
              <option>Modena</option> 
              <option>Trofeo</option> 
              <option>Coupe</option> 
              <option>4.7 V8</option> 
              <option>Sport Diesel</option> 
              <option>MC Diesel</option> 
              <option>4.7 MC</option> 
              <option>Shine</option> 
              <option>You 1.2 5 STR</option> 
              <option>Plus 1.2 5 STR</option> 
              <option>Plus 1.2 5 STR Dual Tone</option> 
              <option>Plus 1.2 5 STR Vibe Pack</option> 
              <option>Plus 1.2 7 STR</option> 
              <option>Plus 1.2 5 STR Vibe Pack Dual Tone</option> 
              <option>Plus 1.2 7 STR Dual Tone</option> 
              <option>Plus 1.2 7 STR Vibe Pack</option> 
              <option>Max 1.2 5 STR</option> 
              <option>Plus 1.2 7 STR Vibe Pack Dual Tone</option> 
              <option>Max 1.2 5 STR Dual Tone</option> 
              <option>Max 1.2 5 STR Vibe Pack</option> 
              <option>Max 1.2 7 STR</option> 
              <option>Shine Dual Tone</option> 
              <option>Shine Vibe Pack Dual Tone</option> 
              <option>Live</option> 
              <option>Feel Blu Edition 1.2 Petrol</option> 
              <option>Feel</option> 
              <option>Feel Vibe Pack</option> 
              <option>Feel Dual Tone</option> 
              <option>V12</option> 
              <option>3.0 Petrol</option> 
              <option>Coupe</option> 
              <option>Berlinetta</option> 
              <option>M</option> 
              <option>Petrol</option> 
              <option>Spider</option> 
              <option>750S Coupe</option> 
              <option>750S Spider</option> 
              <option>McLaren GT Coupe</option> 
              <option>B5 Ultimate</option> 
              <option>B6 Ultimate</option> 
              <option>Recharge Single</option> 
              <option>E80</option> 
              <option>Aston Martin DB12 4.0-litre</option> 
              <option>Evolution</option> 
              <option>Twin Turbo</option> 
              <option>707</option> 
              <option>V8</option> 
              <option>Competition</option> 
              <option>sDrive18i M Sport</option> 
              <option>sDrive18d M Sport</option> 
              <option>740i M Sport</option> 
              <option>740d M Sport</option> 
              <option>220i M Sport</option> 
              <option>220i M Sport Pro</option> 
              <option>M Performance Edition</option> 
              <option>220d M Sport</option> 
              <option>M340i xDrive</option> 
              <option>xDrive40i M Sport</option> 
              <option>xDrive40d M Sport</option> 
              <option>330Li M Sport</option> 
              <option>320Ld M Sport</option> 
              <option>330Li M Sport Pro Edition</option> 
              <option>Plug-in Hybrid</option> 
              <option>xDrive30 M Sport</option> 
              <option>M40i xDrive</option> 
              <option>eDrive35 M Sport</option> 
              <option>eDrive40 M Sport</option> 
              <option>eDrive50 M Sport</option> 
              <option>eDrive60 M Sport</option> 
              <option>M70 xDrive</option> 
              <option>M60 xDrive</option> 
              </select> 
            </div>

            <div className="mt-5 ml-2 w-full">
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
          </div>
          <div className="flex">
            <div className="mt-5 w-full">
              <Inputs
                label={"Price"}
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
              <select
                className="w-full border-2 border-gray-400 p-2 rounded-md"
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
              >
                <option>Year</option>
                <option>2005</option>
                <option>2006</option>
                <option>2007</option>
                <option>2008</option>
                <option>2009</option>
                <option>2010</option>
                <option>2011</option>
                <option>2012</option>
                <option>2013</option>
                <option>2014</option>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
              </select>
            </div>
          </div>

          {/* fourth part */}
          <div className="md:flex">
            <div className="mt-5 w-full">
              <select
                className="w-full border-2 border-gray-400 p-2 rounded-md"
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
              >
                <option>Color</option>
                <option>Red</option>
                <option>Blue</option>
                <option>Yellow</option>
                <option>Pink</option>
                <option>Purple</option>
                <option>White</option>
                <option>Black</option>
                <option>Orange</option>
                <option>Green</option>
                <option>Brown</option>
                <option>Gold</option>
                <option>Aqua</option>
              </select>
            </div>

            <div className="mt-5 ml-2 w-full">
              <select
                className="w-full border-2 border-gray-400 p-2 rounded-md"
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
              >
                <option>Owner Serial</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          {/* fifth part */}
          <div className="md:flex">
          <div className="mt-5 w-full">
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

            <div className="mt-5 md:ml-2 w-full">
            <select
        required
        className="w-full border-2 border-gray-400 p-2 rounded-md"
        name="carInsurance"
        value={formData.carInsurance}
        onChange={handleChange}
      >
        <option value="">Car Insurance</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      {showCalendar && (
        <div className="mt-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.insurancedate}
            onChange={handleDateChange}
            className="w-full border-2 border-gray-400 p-2 rounded-md"
          />
        </div>
      )}


            </div>
          </div>

          {/* sixth part */}
          <div className="md:flex">
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

            <div className="mt-5 md:ml-2 w-full">
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
                <option>CNG</option>
              </select>
            </div>
          </div>

          {/* eight part */}

          <div className="md:flex">
            <div className="mt-5 w-full">
              <select
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                label={"City"}
                type={"text"}
                name={"city"}
                value={formData.city}
                onChange={handleCityChange}
              >
                <option>City</option>
                {Object.keys(cityOptions).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 ml-2 w-full">
              <select
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                label={"Registration"}
                type={"text"}
                name={"registration"}
                value={formData.registration}
                onChange={(event) =>
                  setFormData({ ...formData, registration: event.target.value })
                }
                disabled={!formData.city}
              >
                {/* <option>Registration</option> */}
                {cityOptions[formData.city]?.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* </div> */}
         

          {/* ninth part */}
          <div className="md:flex">
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
          <div className="mt-5 mb-2">
            <h4>Title</h4>
            <div className="formrow">
              <Input
                required
                className="form-control"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    title: event.target.value,
                  });
                }}
              ></Input>
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

          {/* <div className="mt-5 mb-2">
            <h4>Title</h4>
            <div className="formrow">
              <Input
                required
                className="form-control"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    title: event.target.value,
                  });
                }}
              ></Input>
            </div>
          </div> */}

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