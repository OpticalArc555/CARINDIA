/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Slider, Typography } from "@material-tailwind/react";
import { FaFilter } from "react-icons/fa";
import { useGetOnlyBrandsQuery, useGetVariantsQuery } from "../../services/brandAPI";
import { Autocomplete, TextField } from "@mui/material";

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

  const handleBrandChange = (event, newValue) => {
    const brand = newValue;
    setSelectedBrand(brand);
    setFilterForm({
      ...filterForm,
      brand,
      model: "", // Reset model when brand changes
    });
  };

  const handleModelChange = (event,newValue) => {
    const model = newValue;
    setFilterForm({
      ...filterForm,
      model,
    });
  };

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

  const AreaData = [
    {area : "Viman Nagar",year : 2005},
    {area : "Koregaon Park",year : 2006},
    {area : "Aundh",year : 2007},
    {area : "Kothrud",year : 2008},
    {area : "Hadapsar",year : 2009},
    {area : "Shivajinagar",year : 2010},
    {area : "Kalyani Nagar",year : 2011},
    {area : "Pimpri-Chinchwad",year : 2012},
    {area : "Magarpatta",year : 2013},
    {area : "Wadgaon Sheri",year : 2014},
    {area : "Katraj",year : 2015},
    {area : "Model Colony",year : 2016},
    {area : "Pune Cantonment",year : 2017},
    {area : "Senapati Bapat Road",year : 2018},
    {area : "Bhosari",year : 2018},
    {area : "Chakan",year : 2019},
    {area : "Bavdhan",year : 2020},
    {area : "Hinjewadi",year : 2021},
    {area : "Baner",year : 2022},
    {area : "Kharadi",year : 2023},
    {area : "Wagholi",year : 2024},
    
  ]
  
  const FuleType = [
    {fuelType : 'Petrol'},
    {fuelType : 'Diesel'},
    {fuelType : 'Electric'},
    {fuelType : 'CNG'},
    {fuelType : 'Petrol+CNG'},
  ]

  const Transmission =[
    {transmission : "Automatic"},
    {transmission : "Manual"},
    
  ]
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
                  defaultValue={10000000}
                  step={10000}
                  min={200000}
                  max={10000000}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>

              <Autocomplete
  id="free-solo-demo"
  freeSolo
  options={AreaData}
  getOptionLabel={(option) => option.area}
  sx={{ width: 250, background: "White" }}
  onInputChange={(event, newInputValue) => {
    
    setFilterForm((prevForm) => ({
      ...prevForm,
      area: newInputValue,
    }));
  }}
  onChange={(event, newValue) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      area: newValue ? newValue.area : "",
    }));
  }}
  renderInput={(params) => <TextField {...params} label="Area" />}
/>
<Autocomplete
  id="free-solo-demo"
  freeSolo
  options={AreaData}
  getOptionLabel={(option) => option.year}
  sx={{ width: 250, background: "White" }}
  onInputChange={(event, newInputValue) => {
    
    setFilterForm((prevForm) => ({
      ...prevForm,
      year: newInputValue,
    }));
  }}
  onChange={(event, newValue) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      year: newValue ? newValue.year : "",
    }));
  }}
  renderInput={(params) => <TextField {...params} label="Year" />}
/>
<Autocomplete
  id="free-solo-demo"
  freeSolo
  options={brands}
  getOptionLabel={(option) => option}
  sx={{ width: 250, background: "White" }}
  onChange={handleBrandChange}
  renderInput={(params) => <TextField {...params} label="Brands" />}
/>
<Autocomplete
  id="free-solo-demo"
  freeSolo
  options={modelOptions}
  getOptionLabel={(option) => option}
  sx={{ width: 250, background: "White" }}
  onChange={handleModelChange}
  renderInput={(params) => <TextField {...params} label="Models" />}
/>
<Autocomplete
  id="free-solo-demo"
  freeSolo
  options={FuleType}
  getOptionLabel={(option) => option.fuelType}
  sx={{ width: 250, background: "White" }}
  onInputChange={(event, newInputValue) => {
    
    setFilterForm((prevForm) => ({
      ...prevForm,
      fuleType: newInputValue,
    }));
  }}
  onChange={(event, newValue) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      fuelType: newValue ? newValue.fuelType : "",
    }));
  }}
  renderInput={(params) => <TextField {...params} label="Fule Type" />}
/>
<Autocomplete
  id="free-solo-demo"
  freeSolo
  options={Transmission}
  getOptionLabel={(option) => option.transmission}
  sx={{ width: 250, background: "White" }}
  onInputChange={(event, newInputValue) => {
    
    setFilterForm((prevForm) => ({
      ...prevForm,
      transmission: newInputValue,
    }));
  }}
  onChange={(event, newValue) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      transmission: newValue ? newValue.transmission : "",
    }));
  }}
  renderInput={(params) => <TextField {...params} label="Transmission" />}
/>
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
