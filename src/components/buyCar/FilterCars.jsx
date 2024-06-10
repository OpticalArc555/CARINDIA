import { useState } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Slider, Typography } from "@material-tailwind/react";
// eslint-disable-next-line react/prop-types
const FilterCars = ({ setUrlState }) => {
  const [value, setValue] = useState(200000);

  console.log(value);
  const [filterForm, setFilterForm] = useState({
    area: "",
    year: "",
    brand: "",
    model: "",
    fuelType: "",
    transmission: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFilterForm({ ...filterForm, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const { area, year, brand, model, fuelType, transmission } = filterForm;
    const minPrice = 3999; // Assuming this is your default minimum price
    const maxPrice = value; // Maximum price from the slider
    let url = ``;
console.log(brand.toUpperCase())
    // Append selected filters to the URL if they are not empty
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice > minPrice) url += `&maxPrice=${maxPrice}`;
    if (area) url += `&area=${area}`;
    if (year) url += `&year=${year}`;
    if (brand) url += `&brand=${brand}`;
    if (model) url += `&model=${model}`;

    if (transmission) url += `&transmission=${transmission}`;
    if (fuelType) url += `&fuel_type=${fuelType}`;
    
    setUrlState(url);

    
  };

  const resetForm = () => {
    setValue(200000);
    setFilterForm({
      area: "",
      year: "",
      brand: "",
      model: "",
      fuelType: "",
      transmission: "",
    });
  };
  console.log(new Intl.NumberFormat("en-IN").format(value));
  const formattedAmount = new Intl.NumberFormat("en-IN").format(value);
  
  return (
    <Card className="p-4">
      <div className="space-y-4  ">
        <form onSubmit={submitHandle}>
          
          <div className="mb-1 flex flex-col gap-6 ">
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
              className="border border-gray-700 h-10 rounded-lg md:w-[50%] lg:w-full "
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
              onChange={handleChange}
              value={filterForm.brand}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option>Select Brand</option>
              <option>Tata</option>
              <option>Honda</option>
              <option>Hyundai</option>
              <option>Mahindra</option>
              <option>Kia</option>
              <option>Suzuki</option>
              <option>Volkswagen</option>
              <option>BMW</option>
              <option>Mercedes</option>
              <option>Skoda</option>
              <option>Citroen</option>
              <option>Maruti</option>
            </select>
            <select
              name="model"
              onChange={handleChange}
              value={filterForm.model}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option>Select Model</option>
              <option>Harrier</option>
              <option>Verna</option>
              <option>Swift</option>
              <option>i20</option>
              <option>Sonet</option>
              <option>Virtus</option>
              <option>Creta</option>
            </select>
            <select
              name="fuelType"
              onChange={handleChange}
              value={filterForm.fuelType}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option> Fuel Type</option>
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
            <select
              name="ownership"
              onChange={handleChange}
              value={filterForm.ownership}
              className="border border-gray-700 h-10 rounded-lg"
            >
              <option>Ownership</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="flex gap-5 mt-5">
            <Button type="submit" className="bg-indigo-200">Search</Button>
            <Button onClick={resetForm} className="bg-indigo-200">Reset</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default FilterCars;
