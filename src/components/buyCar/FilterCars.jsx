/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Slider, Typography } from "@material-tailwind/react";
import { FaFilter } from "react-icons/fa";
import { useGetOnlyBrandsQuery, useGetVariantsQuery } from "../../services/brandAPI";

// eslint-disable-next-line react/prop-types
const FilterCars = ({ setUrlState }) => {

  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [value, setValue] = useState();
  const [showFilters, setShowFilters] = useState(false);

  const { data: variantData } = useGetVariantsQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  useEffect(() => {
    if (variantData) {
      const models = [...new Set(variantData.list.map((item) => item.variant))]; // Use Set to remove duplicates
      setModelOptions(models);
    }
  }, [variantData]);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
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

  let formattedAmount;

  if (value == null || value === '' || isNaN(value)) {
    formattedAmount = '---';
  } else {
    formattedAmount = new Intl.NumberFormat("en-IN").format(value);
  }

  return (
    <div className="border-2 shadow-lg rounded-lg">
      <div className="flex justify-end mr-5 ">
        <button
          type="button"
          className="md:hidden -mt-10 text-black font-bold flex hover:rounded-2xl hover:p-2 hover:shadow-2xl hover:border-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="mt-1 mr-1"><FaFilter /></span>Filter
        </button>
      </div>

      <Card className={`p-4 ${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className="space-y-4">
          <form onSubmit={submitHandle}>
            <div>
              <p className="font-bold mb-5 text-xl text-indigo-400">Filters</p>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-8 font-semibold">
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
                {brands.map((brand) => (
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
                <option>CNG</option>
                <option value="Petrol,CNG">Petrol+CNG</option>
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

              <Button type="submit" className="bg-indigo-400">
                Search
              </Button>
              <Button onClick={resetForm} className="bg-indigo-400">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default FilterCars;
