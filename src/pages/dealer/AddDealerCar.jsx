import { useState } from "react";
import Inputs from "../../forms/Inputs";
import { Textarea, Input } from "@material-tailwind/react";
// import React from "react";
import { useCarRegisterMutation } from "../../services/carAPI";
import { useNavigate, useParams } from "react-router";

const carData = {
  Kia: ["Sonet", "Seltos", "Carnival"],
  Volkswagen: ["Polo", "Vento", "Taigun", "Virtus"],
  Mahindra: ["XUV300", "XUV700", "Thar", "Scorpio", "Bolero", "Marazzo"],
  MarutiSuzuki: [
    "Swift",
    "Baleno",
    "Vitara Brezza",
    "Ertiga",
    "Alto K10",
    "Dzire",
    "Wagon R",
    "XL6",
    "Celerio",
    "Jimny",
    "Ignis",
    "Eeco",
    "Invicto",
    "Ciaz",
  ],
  Citroen: ["C3", "C3 Aircross", "eC3", "C5 Aircross"],
  Tata: [
    "Tigor",
    "Altroz",
    "Harrier",
    "Safari",
    "Hexa",
    "Tigor EV",
    "Nexon EV",
    "Punch",
  ],

  Hyundai: [
    "Verna",
    "i20",
    "Venue",
    "Creta",
    "Santro",
    "Grand i10 Nios",
    "Aura",
    "Exter",
    "Alcazar",
  ],
  Honda: ["City", "Amaze", "WR-V"],
  BMW: [
    "3 Series",
    "5 Series",
    "X1",
    "X3",
    "X5",
    "7 Series",
    "X7",
    "iX1",
    "i4",
    "i7",
    "i5",
    "iX1",
    "XM",
    "BMW M340i",
    "2 Series Gran Coupe",
    "M4",
  ],
  Toyota: [],
  ISUZU: [],
  Skoda: [],
  LandRover: [
    "Discovery",
    "Range Rover Sport",
    "Discovery Sport",
    "Range Rover",
    "Defender",
    "Range Rover Velar",
    "Range Rover Evoque",
    "",
  ],
  Fiat: [],
  Nissan: [],
  Volvo: ["S90","XC60","XC90","XC40","C40 Recharge"],
  AstonMartin: ["Aston Martin DB12", "DB11", "DBX", "Vantage"],
  McLaren: ["720S","750S","GT"],
  Ferrari: ["Purosangue SUV","296 GTB","Roma","F8 Tributo","Portofino M","296 GTS 3.0"],
  Maserati: ["Ghibli","MC20","Quattroporte","Levante","GranTurismo"],
  MINI: ["Cooper","Countryman","Cooper SE","Cooper 3 Door"],
  Bugatti: ["Divo","Veyron"],
  ForceMotors: ["Trax Cruiser"],
  Force: ["Gurkha"],
  Bentley: ["Bentayga", "Flying Spur", "Continental"],
  Audi: [
    "e-tron",
    "Q8",
    "A8L",
    "RS Q8",
    "RS5",
    "Q5",
    "A6",
    "Q7",
    "S5",
    "e-tron GT",
    "Q3 Sportback",
    "Q3",
    "A4",
  ],
  Porsche: [
    "911",
    "Taycan",
    "Macan",
    "Cayenne",
    "Panamera",
    "718",
    "Taycan Cross Turismo",
    "Cayenne Coupe",
    "Macan Turbo EV",
  ],
  MercedesBenz: [
    "EQC",
    "AMG GT",
    "AMG G-Class",
    "AMG E-Class",
    "AMG C-Class",
    "S-Class Coupe",
    "C-Class Coupe",
    "E-Class Coupe",
    "GLS",
    "GLE",
    "GLC",
    "GLB",
    "GLA",
    "S-Class",
    "E-Class",
    "C-Class",
    "A-Class Limousine",
  ],
  Others: [],
};

const carVariantData = {
  Sonet: ["HTE 1.2", "HTK+ 1.2", "GTX+ 1.0 Turbo", "GTX+ 1.5 Diesel"],
  Seltos: ["HTE", "HTK", "HTK+", "HTX", "GTX", "GTX+", "GTX+ Diesel"],
  Carnival: ["Premium", "Prestige", "Limousine"],
  Polo: ["Trendline 1.0L", "Comfortline 1.0L", "Highline Plus 1.0L", "GT 1.0L"],
  Vento: [
    "Trendline 1.0L",
    "Comfortline 1.0L",
    "Highline 1.0L",
    "Highline Plus 1.0L",
  ],
  Taigun: [
    "Comfortline 2.0L",
    "Highline 2.0L",
    "Comfortline 1.0L",
    "Highline Plus 1.0L",
  ],
  Virtus: ["Dynamic 1.0L", "Performance Line 1.5L"],
  XUV300: ["W2", "W4", "W6", "W8"],
  XUV700: ["AX3", "AX5", "AX7", "AX7 L"],
  Thar: [
    "AX Std 6-Str Soft Top",
    "AX OPT 4-Str Convertible Top",
    "LX 4-Str Convertible Top",
    "LX 4-Str Hard Top",
  ],
  Scorpio: [
    "S3 Plus 2.0 4WD 7S",
    "S5 2.0 7S",
    "S7 2.0 7S",
    "S9 2.0 4WD 7S",
    "S11 2.0 4WD 7S",
  ],
  Bolero: ["B2", "B4", "B6", "B6 Opt", "B6 Opt Dual Tone"],
  Marazzo: ["M2", "m4"],
  Swift: [
    "LXI",
    "VXI",
    "ZXI",
    "ZXI+",
    "ZXI+ Dual Tone",
    "ZXI+ AMT",
    "ZXI+ AMT Dual Tone",
  ],
  Baleno: ["Delta", "Sigma", "Zeta", "Alpha"],
  "Vitara Brezza": ["LXI", "VXI", "ZXI", "ZXI+"],
  Ertiga: [
    "LXI",
    "VXI",
    "ZXI",
    "ZXI+",
    "ZXI AT",
    "ZXI+ AT",
    "ZXI+ Dual Tone",
    "ZXI+ Dual Tone AT",
  ],
  Tigor: [
    "XE",
    "XM",
    "XT",
    "XZ",
    "XZ+",
    "XMA",
    "XZA",
    "XZA+",
    "XZ+ Dual",
    "XZ+ AMT",
    "XZ+ Dual",
  ],
  Altroz: [
    "XE",
    "XM",
    "XT",
    "XZ",
    "XZ+",
    "XMA",
    "XZA",
    "XZA+",
    "XZ+ Dual",
    "XZ+ AMT",
    "XZ+ Dual",
  ],
  Harrier: [
    "XE",
    "XM",
    "XT",
    "XZ",
    "XZ+",
    "XMA",
    "XZA",
    "XZA+",
    "XZA DT",
    "XZ+ DT",
  ],
  Safari: [
    "Gold",
    "XE",
    "XM",
    "XT",
    "XT+",
    "XZ",
    "XZ+",
    "Adventure",
    "XZA",
    "XZA+",
  ],
  Hexa: ["XE", "XM", "XMA", "XT", "XTA", "XT 4*4", "XTA 4*4"],
  "Tigor EV": ["XM", "XZ", "XZ+"],
  "Nexon EV": ["XM", "XZ", "XZ+", "XZ+ Lux"],
  Punch: [
    "Pure iCNG",
    "Adventure Rhythm Pack MT",
    "Adventure AMT",
    "Accomplished MT",
    "Adventure iCNG",
    "Adventure Rhythm Pack AMT",
    "Accomplished Dazzle Pack MT",
    "Adventure Rhythm iCNG",
    "Accomplished MT Sunroof",
    "Accomplished Dazzle MT Sunroof",
  ],
  AltoK10: ["LXI", "LXI (0)", "VXI", "VXI (0)", "VXI AMT", "VXI AMT (0)"],
  Dzire: [
    "LXI",
    "VXI",
    "VXI AGS",
    "ZXI",
    "ZXI AGS",
    "ZXI+",
    "ZXI+ AGS",
    "LDI",
    "VDI",
    "VDI AGS",
    "ZDI",
    "ZDI AGS",
    "ZDI+",
    "ZDI+ AGS",
  ],
  WagonR: [
    "LXI",
    "LXI (0)",
    "VXI",
    "VXI (0)",
    "VXI AGS",
    "VXI AGS (0)",
    "VXI+",
    "VXI+ AGS",
    "VXI+ AGS (0)",
    "ZXI",
    "ZXI AMT",
  ],
  SPresso: [
    "STD",
    "STD(0)",
    "LXI",
    "LXI (0)",
    "VXI",
    "VXI AGS",
    "VXI+",
    "VXI+ AGS",
  ],
  XL6: [
    "Zeta MT Petrol",
    "Zeta MT CNG",
    "Alpha MT Petrol",
    "Zeta AT Petrol",
    "Alpha Plus MT Petrol",
    "Alpha Plus MT Petrol Dual Tone",
    "Alpha AT Petrol",
    "Alpha Plus AT Petrol",
    "Alpha Plus AT Petrol Dual Tone",
  ],
  Celerio: [
    "LXI",
    "VXI",
    "ZXI",
    "ZXI+",
    "VXI AMT",
    "ZXI AMT",
    "ZXI+ AMT",
    "VXI CNG",
    "ZXI CNG",
  ],
  Jimny: [
    "Zeta MT",
    "Alpha MT",
    "Alpha MT Dual Tone",
    "Alpha AT",
    "Alpha AT Dual Tone",
  ],
  Ignis: [
    "Sigma MT",
    "Delta MT",
    "Zeta MT",
    "Alpha MT",
    "Delta AMT",
    "Zeta AMT",
    "Alpha AMT",
  ],
  Eeco: [
    "5 Seater Standard",
    "5 Seater AC",
    "7 Seater Standard",
    "5 Seater CNG",
    "Cargo Standard",
    "Cargo CNG",
    "Tour V 5 Seater AC",
    "Tour V 5 Seater CNG",
  ],
  Invicto: ["Zeta+ 7-seater", "Alpha+ 7-seater", "Alpha+ 8-seater"],
  Ciaz: [
    "Sigma MT",
    "Delta MT",
    "Zeta MT",
    "Alpha MT",
    "Delta AT",
    "Zeta AT",
    "Alpha AT",
  ],
  "A-Class Limousine": ["A 200", "A 200d"],
  "C-Class": ["C 200", "C 200d"],
  "E-Class": ["E 200", "E 200d", "E 350d", ""],
  "S-Class": ["S 350d", "S 400d", "S 450"],
  GLA: ["GLA 200", "GLA 200d"],
  GLB: ["GLB 200", "GLB 201", "GLB 220d", "GLB 250", "GLB 251", "GLB 35 AMG"],
  GLC: ["GLC 200", "GLC 201", "GLC 220d", "GLC 300", "GLC 301", "GLC 43 AMG"],
  GLE: ["GLE 350", "GLE 351", "GLE 400d", "GLE 450 AMG", "GLE 53 AMG"],
  GLS: ["GLS 450", "GLS 451", "GLS 580", "GLS 581", "GLS 400d"],
  "C-Class Coupe": ["C 200 Coupe", "C 300 Coupe", "AMG C 43 Coupe"],
  "E-Class Coupe": [
    "E 200 Coupe",
    "E 300 Coupe",
    "AMG E 53 Coupe",
    "AMG E 63 Coupe",
  ],
  "S-Class Coupe": [
    "S 450 Coupe",
    "S 560 Coupe",
    "AMG S 53 Coupe",
    "AMG S 63 Coupe",
    "AMG S 65 Coupe",
  ],
  "AMG A-Class": [
    "A 35",
    "A 36",
  ],
  "AMG C-Class": [
    "C 63",
    "C 64",
    "C 63 S",
  ],
  "AMG E-Class": [
    "E 63",
    "E 64",
    "E 63 S",
  ],
  "AMG G-Class": [
    "C 63",
    "C 64",
  ],
  "AMG GT": [
    "GT",
    "GT S",
    "GT C",
    "GT R",
    "GT R Pro",
    "GT Balck Series",
  ],
  EQC:[
    "EQC 400"
  ],
  "Range Rover Evoque":[
    "SE R-Dynamic Petrol",
    "SE R-Dynamic Deisel"
  ],
  "Range Rover Velar":[
    "HSE Dynamic 2.0 Petrol",
    "HSE Dynamic 2.0 Deisel"
  ],
  Defender:[
    "110 SE 2.0 Petrol",
    "90 HSE 2.0 Petrol",
    "90 X-Dynamic HSE 2.0 Petrol",
    "110 HSE 2.0 Petrol"
  ],
  "Range Rover":[
    "SE 3.0 Petrol",
    "SE 4.4 Petrol",
    "SE 3.0 Deisel",
    "SE LWB 3.0 Petrol",
  ],
  "Discovery Sport":[
    "SE R-Dynamic Petrol",
    "SE R-Dynamic Deisel",
  ],
  Discovery:[
    "S 2.0 Petrol",
    "S 3.0 Petrol",
    "HSE R-Dynamic 2.0 Petrol",
    "S 3.0 Diesel"
  ],
  911:[
    "Carrera",
    "Carrera T",
    "Carrera Cabriolet",
    "Carrera S"
  ],
  Taycan:[
    "RWD",
    "4S",
    "GTS",
    "Turbo"
  ],
  Macan:[
    "S",
    "GTS",
  ],
  Cayenne:[
    "Base"
  ],
  Panamera:[
    "G3"
  ],
  718:[
    "Cayman",
    "Boxster",
    "Cayman Style Edition",
    "Boxster Style Edition"
  ],
  A4:[
    "Premium 40 TFSI",
    "Premium Plus 40 TFSI",
    "Technology 40 TFSI"
  ],
  Q3:[
    "40 TFSI Premium",
    "40 TFSI Premium Plus",
    "40 TFSI Technology",
    "Bold Edition",
  ],
  "Q3 Sportback":[
    "Technology Plus S-line",
    "Bold Edition",
  ],
  "e-tron GT":[
    "S",
    "RS"
  ],
  S5:[
    "S5 Sportback 3.0 TFSI",
  ],
  Q7:[
    "Premium Plus 55 TFSI",
    "Technology 55 TFSI w/o Matrix",
    "Technology 55 TFSI",
    "Bold Edition",
  ],
  A6:[
    "Premium Plus 45 TFSI",
    "Technology 45 TFSI W/O Matrix",
    "Technology 45 TFSI"
  ],
  Q5:[
    "Premium Plus 45 TFSI",
    "Technology 45 TFSI",
  ],
  Q8:[
    "Celebration",
    "55 TFSI quattro"
  ],
  RS5:[
    "Sportback"
  ],
  "RS Q8":[
    "4.0L TFSI"
  ],
  "A8 L":[
    "Celebration Edition",
    "Technology"
  ],
  Continental:[
    "GT V8",
    "GTC V8",
    "GT S V8",
    "GT Azure V8",
    "GT Speed"
  ],
  "Flying Spur":[
    "V6 Hybrid",
    "V8",
    "V8 Hybrid",
    "S V8",
    "S Hybrid"
  ],
  Bentayga:[
    "V8",
    "EWB",
    "S",
    "Azure",
    "EWB Azure",
  ],
  Gurkha:[
    "3 Door",
    "5 Door"
  ],
  "Trax Cruiser":[
    "9 STR",
    "12 STR",
    "9 STR AC",
    "12 STR AC",
  ],
  Divo:[
    "W16"
  ],
  Veyron:[
    "Veyron 16.4 Grand Sport"
  ],
  Cooper:[
    "Cooper S",
    "Cooper S (Steptronic Sport)"
  ],
  Countryman:[
    "Countryman Cooper S JCW Inspired"
  ],
  "Cooper SE":[
    "Cooper SE 3-Door",
    "Cooper SE Charged Edition"
  ],
  "Cooper 3 DOOR":[
    "S"
  ],
  Ghibli:[
    "GT Hybrid",
    "Modena S",
    "Trofeo"
  ],
  Quattroporte:[
    "GT",
    "Modena","Trofeo"
  ],
  MC20:[
    "Coupe"
  ],
  Levante:[
    "GT Hybrid",
    "Modena",
    "Modena S",
    "Trofeo"
  ],
  GranTurismo:[
    "4.7 V8",
    "Sport Diesel",
    "MC Diesel",
    "4.7 MC"
  ],
  C3:[
    "Shine"
  ],
  "C3 Aircross":[
    "You 1.2 5 STR",
    "Plus 1.2 5 STR",
    "Plus 1.2 5 STR Dual Tone",
    "Plus 1.2 5 STR Vibe Pack",
    "Plus 1.2 7 STR",
    "Plus 1.2 5 STR Vibe Pack Dual Tone",
    "Plus 1.2 7 STR Dual Tone",
    "Plus 1.2 7 STR Vibe Pack",
    "Max 1.2 5 STR",
    "Plus 1.2 7 STR Vibe Pack Dual Tone",
    "Max 1.2 5 STR Dual Tone",
    "Max 1.2 5 STR Vibe Pack",
    "Max 1.2 7 STR",
    "Max 1.2 5 STR Vibe Pack Dual Tone",
    "Max 1.2 7 STR Dual Tone",
    "Max 1.2 7 STR Vibe Pack",
    "Plus 1.2 5 STR AT",
    "Max 1.2 7 STR Vibe Pack Dual Tone",
    "Plus 1.2 5 STR AT Dual Tone",
    "Plus 1.2 5 STR AT Vibe Pack",
    "Plus 1.2 5 STR AT Vibe Pack Dual Tone","Max 1.2 5 STR AT","Max 1.2 7 STR AT Vibe Pack Dual Tone","Max 1.2 7 STR AT Vibe Pack","Max 1.2 7 STR AT Dual Tone","Max 1.2 5 STR AT Vibe Pack Dual Tone"
  ],
  "C5 Aircross":[
    "Shine Dual Tone"
  ],
  eC3:[
    "Shine Vibe Pack Dual Tone","Live","Feel Blu Edition 1.2 Petrol","Feel","Feel Vibe Pack","Feel Dual Tone","Feel Vibe Pack Dual Tone","Shine Blu Edition 1.2 Petrol","Shine","Shine Vibe Pack","Shine Dual Tone","Shine Vibe Pack Dual Tone"
  ],
  "Purosangue SUV":[
    "V12"
  ],
  "296 GTB":[
    "3.0 Petrol"
  ],
  Roma:[
    "Coupe"
  ],
  "F8 Tributo":[
    "Berlinetta"
  ],
  "Portofino M":[
    "M"
  ],
  "720S":[
    "Spider"
  ],
  "McLaren 750S":[
    "750S Coupe",
    "750S Spider",
    "McLaren GT Coupe",
  ],
  S90:[
    "B5 Ultimate",""
  ],
  XC60:[
    "B5 Ultimate",""
  ],
  XC90:[
    "B6 Ultimate"
  ],
  XC40:[
    "Recharge Single"
  ],
  "C40 Recharge":[
    "E80"
  ],
  "Aston Martin DB12":[
    "Aston Martin DB12 4.0-litre"
  ],
  DB11:[
    "Evolution"
  ],
  DBX:[
    "Twin Turbo","707"
  ],
  Vantage:[
    "V8"
  ],
  
  i5: ["M60 xDrive"],
  iX1: ["xDrive30 M Sport"],
  i7: ["M70 xDrive", "xDrive60 M Sport", "eDrive50 M Sport"],
  i4: ["eDrive40 M Sport", "eDrive35 M Sport"],
  X3: ["M40i xDrive"],
  IX1: ["xDrive30 M Sport"],
  XM: ["Plug-in Hybrid"],
  M4: ["Competition"],
  X1: ["sDrive18i M Sport", "sDrive18d M Sport"],
  "7 Series": ["740i M Sport", "740d M Sport"],
  "2 Series Gran Coupe": [
    "220i M Sport",
    "220i M Sport Pro",
    "M Performance Edition",
    "220d M Sport",
  ],
  "BMW M340i": ["M340i xDrive"],
  X7: ["xDrive40i M Sport", "xDrive40d M Sport"],
  "3 Series Gran Limousine": [
    "330Li M Sport",
    "320Ld M Sport",
    "330Li M Sport Pro Edition",
  ],
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
  Nanded: ["MH-26"],
  Latur: ["MH-24"],
  Satara: ["MH-11"],
  Sangli: ["MH-10"],
  Nashik: ["MH-15", "MH-51"],
  Beed: ["MH-32"],
  Jalna: ["MH-21"],
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
    cVariant: "",
    insurancedate: "",
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
    console.log(formData);
    // Prepare the form data to send to the backend
    const data = {
      acFeature: formData.acFeature,

      musicFeature: formData.musicFeature,

      area: formData.area,

      brand: formData.brand,

      carInsurance: formData.carInsurance,

      carStatus: "ACTIVE",

      // city: formData.city,

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

      variant: formData.cVariant,

      carInsuranceDate: formData.insurancedate,

      year: formData.year,

      dealer_id: id,

      date: formattedDate,
    };
    console.log(data);
    const res = await carRegister(data);
    console.log(res);
    if (res?.data?.status === "success") {
      alert("Car added");
      navigate(`/dealer/${id}/uploadimage`); // Corrected URL string with backticks (`) for interpolation
    }
  };

  //Two field Brands and Model
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
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
    setVariantOptions(carVariantData[model] || []);
    setFormData({
      ...formData,
      model,
    });
  };

  const handleVariantChange = (event) => {
    const cVariant = event.target.value;
    setFormData({
      ...formData,
      cVariant,
    });
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setFormData({
      ...formData,
      city: selectedCity,
      registration: "", // Reset registration when city changes
    });
  };

  // Car Insurance ValidDate
  const handleChange = (event) => {
    const value = event.target.value === "true";
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
                onChange={handleVariantChange}
                disabled={!modelOptions}
              >
                <option value="">Car Variant</option>
                {variantOptions.map((cVariant) => (
                  <option key={cVariant} value={cVariant}>
                    {cVariant}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 md:ml-2 w-full">
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
          <div className="md:flex">
            <div className="mt-5 w-full">
              <Input
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    price: event.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 md:ml-2 w-full">
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

            <div className="mt-5 md:ml-2 w-full">
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
              <Input
                label="Km Driven"
                type="number"
                name="kmDriven"
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
                label="City"
                name="city"
                value={formData.city}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
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
                label="Registration"
                name="registration"
                value={formData.registration}
                onChange={(event) =>
                  setFormData({ ...formData, registration: event.target.value })
                }
                disabled={!formData.city}
              >
                <option value="">Select Registration</option>
                {formData.city &&
                  cityOptions[formData.city]?.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* ninth part */}
          <div className="md:flex">
            <div className="mt-5 ml-5">
              <input
                label="Music Feature"
                type="checkbox"
                name="musicFeature"
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
                label="Power Window Feature"
                type="checkbox"
                name="powerWindowFeature"
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
                label="Ac Feature"
                type="checkbox"
                name="acFeature"
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
                label="Rear Parking Camera Feature"
                type="checkbox"
                name="rearParkingCameraFeature"
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

          <button
            type="submit"
            className="p-3 mt-3 bg-indigo-400 rounded-md w-28 text-white"
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
