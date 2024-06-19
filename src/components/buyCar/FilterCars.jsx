/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Slider, Typography } from "@material-tailwind/react";

const carDataF = {
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
  Volvo: ["S90", "XC60", "XC90", "XC40", "C40 Recharge"],
  AstonMartin: ["Aston Martin DB12", "DB11", "DBX", "Vantage"],
  McLaren: ["720S", "750S", "GT"],
  Ferrari: [
    "Purosangue SUV",
    "296 GTB",
    "Roma",
    "F8 Tributo",
    "Portofino M",
    "296 GTS 3.0",
  ],
  Maserati: ["Ghibli", "MC20", "Quattroporte", "Levante", "GranTurismo"],
  MINI: ["Cooper", "Countryman", "Cooper SE", "Cooper 3 Door"],
  Bugatti: ["Divo", "Veyron"],
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

// eslint-disable-next-line react/prop-types
const FilterCars = ({ setUrlState }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [value, setValue] = useState();

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    console.log("brand", carDataF[brand]);
    setSelectedBrand(brand);
    setModelOptions(carDataF[brand] || []);
    setFilterForm({
      ...filterForm,
      brand,
      model: "", // Reset model when brand changes
    });
  };

  const handleModelChange = (event) => {
    const model = event.target.value;
    setFilterForm({
      ...filterForm,
      model,
    });
  };

  console.log(value);
  const [filterForm, setFilterForm] = useState({
    area: "",
    year: "",
    brand: "",
    model: "",
    fuelType: "",
    transmission: "",
    ownership: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterForm({ ...filterForm, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const minPrice = 3999; // Assuming this is your default minimum price
    const maxPrice = value; // Maximum price from the slider
    const url = {
      Area: filterForm.area,
      Year: filterForm.year,
      Brand: filterForm.brand.toUpperCase(),
      Model: filterForm.model,
      FuleType: filterForm.fuelType,
      Transmission: filterForm.transmission,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
    };
    setUrlState(url);
  };

  const resetForm = () => {
    setValue(200000);
    setSelectedBrand("");
    setModelOptions([]);
    const data = {
      area: "",
      year: "",
      brand: "",
      model: "",
      fuelType: "",
      transmission: "",
    };
    setFilterForm(data);
    setUrlState(data);
  };

  const formattedAmount = new Intl.NumberFormat("en-IN").format(value);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <form onSubmit={submitHandle}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-8">
              Price Range
            </Typography>
            <div className="flex justify-center items-center">
              <div style={{ width: "300px" }}></div>
            </div>
            ₹ {formattedAmount}
            <div className="w-auto flex justify-center">
              <Slider
                className="overflow-hidden w-fit"
                color="black"
                defaultValue={200000}
                step={10000}
                min={200000}
                max={10000000}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div>
              <p className="font-semibold">Filters</p>
            </div>
            <select
              name="area"
              className="border border-gray-700 h-10 rounded-lg md:w-full lg:w-full"
              value={filterForm.area}
              onChange={handleChange}
            >
              <option>Select Area</option>
              <option>Wagholi</option>
              <option>Kharadi</option>
              <option>Baner</option>
              <option>Hinjewadi</option>
              <option>Viman Nagar</option>
              <option>Koregaon Park</option>
              <option>Aundh</option>
              <option>Kothrud</option>
              <option>Hadapsar</option>
              <option>Shivajinagar</option>
              <option>Kalyani Nagar</option>
              <option>Pimpri-Chinchwad</option>
              <option>Erandwane</option>
              <option>Magarpatta</option>
              <option>Wadgaon Sheri</option>
              <option>Katraj</option>
              <option>Model Colony</option>
              <option>Pune Cantonment</option>
              <option>Senapati Bapat Road</option>
              <option>Bhosari</option>
              <option>Boat Club Road</option>
              <option>Chakan</option>
              <option>Bavdhan</option>
            </select>
            <select
              name="year"
              onChange={handleChange}
              value={filterForm.year}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option>Select Year</option>
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
            <select
              name="brand"
              onChange={handleBrandChange}
              value={selectedBrand}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option value="">Brands</option>
              {Object.keys(carDataF).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              name="model"
              onChange={handleModelChange}
              value={filterForm.model}
              disabled={!selectedBrand}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option value="">Models</option>
              {modelOptions.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <select
              name="fuelType"
              onChange={handleChange}
              value={filterForm.fuelType}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option>Fuel Type</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
            <select
              name="transmission"
              onChange={handleChange}
              value={filterForm.transmission}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option>Transmission</option>
              <option>Manual</option>
              <option>Automatic</option>
            </select>
          </div>
          <div className="flex gap-5 mt-5 md:flex-col lg:flex">
            <Button type="submit" className="bg-indigo-200">
              Search
            </Button>
            <Button onClick={resetForm} className="bg-indigo-200">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default FilterCars;
