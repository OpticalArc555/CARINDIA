/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Grid, Typography, Button, Modal, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useGetInspectionReportQuery, useInspectionReportMutation } from '../../services/inspectorapi';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import UploadImage4 from '../../ui/UploadImageComponents/UploadImage4';
import { useAddBiddingCarWithoutImageMutation } from "../../services/inspectorapi"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    maxWidth: '90%',
    maxHeight: '90%',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
}));

const Electrical = () => {
  const classes = useStyles();
  const { beadingCarId } = useParams();
  console.log(beadingCarId);
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "Eletrical" });
  console.log(data);
  const [formData, setFormData] = useState({
    FourPowerWindows: "",
    AirBagFeatures: "",
    MusicSystem: "",
    Sunroof: "",
    ABS: "",
    InteriorParkingSensor: "",
    Electricalwiring: "",
  });

  const [images, setImages] = useState({
    FourPowerWindowss: null,
    AirBagFeaturess: null,
    MusicSystems: null,
    Sunroofs: null,
    ABSs: null,
    InteriorParkingSensors: null,
    Electricalwirings: null,
  });
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;
console.log(userRole)

const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation()
const [openModal, setOpenModal] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [captureModalOpen, setCaptureModalOpen] = useState(false);
const [selectedLable ,setSelectedLable] = useState("");
const [lables, setLables] = useState("");
const [selectfiled, setSelectfiled] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };
console.log(lables)
 
  const [inspectionReport] = useInspectionReportMutation();

  const handleFileChange = async (event, fieldName, imgPreview = "") => {
    console.log(imgPreview);
    let file;
    let imageData;
  if (!event?.target) {
      console.log("name");
      file = event;
      imageData = file;
    } else {
      file = event.target.files[0];
    }
 
    if (!file) return;
 
    const formDataToSend = new FormData();
    formDataToSend.append('image', file);
 
    const reader = new FileReader();
    reader.onload = async () => {
      imageData = reader.result;
      console.log(imageData)
          setFormData({ ...formData, ["FourPowerWindowss"]: imageData });
 
      const inspectionData = {
        documentType: "Inspection Report",
        beadingCarId: beadingCarId,
        doc: "",
        doctype: "Eletrical",
        subtype: lables,
        comment: selectfiled,
      };
 
      try {
        const res = await inspectionReport({ inspectionData, formDataToSend });
        console.log(res);
        alert("Data Uploaded");
      } catch (error) {
        console.error('Error uploading the file:', error);
        alert("Data not Uploaded");
      }
    };
    reader.readAsDataURL(file);
  };


  const handleSubmitWithoutImage = async () => {

    const formDataToSend1 = new FormData();
    formDataToSend1.append('beadingCarId', beadingCarId);
    formDataToSend1.append('doctype', "Steering");
    formDataToSend1.append('subtype', lables);
    formDataToSend1.append('comment', selectfiled);
    try {
      const res = await addBiddingCarWithoutImage({formDataToSend1});
      console.log(res);
      alert("Data Uploaded")
    } catch (error) {
      console.error('Error uploading the data:', error);
      alert("Data not Uploaded")
    }
  };

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "FourPowerWindows":
          setFormData((prev) => ({ ...prev, FourPowerWindows: item.comment }));
          setImages((prev) => ({ ...prev, FourPowerWindowss: item.documentLink }));
          break;
        case "AirBagFeatures":
          setFormData((prev) => ({ ...prev, AirBagFeatures: item.comment }));
          setImages((prev) => ({ ...prev, AirBagFeaturess: item.documentLink }));
          break;
        case "MusicSystem":
          setFormData((prev) => ({ ...prev, MusicSystem: item.comment }));
          setImages((prev) => ({ ...prev, MusicSystems: item.documentLink }));
          break;
        case "Sunroof":
          setFormData((prev) => ({ ...prev, Sunroof: item.comment }));
          setImages((prev) => ({ ...prev, Sunroofs: item.documentLink }));
          break;
        case "ABS":
          setFormData((prev) => ({ ...prev, ABS: item.comment }));
          setImages((prev) => ({ ...prev, ABSs: item.documentLink }));
          break;
        case "InteriorParkingSensor":
          setFormData((prev) => ({ ...prev, InteriorParkingSensor: item.comment }));
          setImages((prev) => ({ ...prev, InteriorParkingSensors: item.documentLink }));
          break;
        case "Electricalwiring":
          setFormData((prev) => ({ ...prev, Electricalwiring: item.comment }));
          setImages((prev) => ({ ...prev, Electricalwirings: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key)
  }

  const handleCaptureImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setCaptureModalOpen(false); // Close the camera modal after capturing the image
  };
  return (
    <div className='p-4'>
      <Typography variant="h4" className='text-black font-bold pb-5'>
        Electricals
      </Typography>
      <Grid container spacing={3}>
        {/* Four Power Windows */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Four Power Windows</InputLabel>
            <Select
              name="FourPowerWindows"
              value={formData.FourPowerWindows}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
            </Select>
          </FormControl>
          <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } variant="contained" color="primary">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" className="cursor-pointer flex items-center">
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {images.FourPowerWindowss && (
            <img
              src={images.FourPowerWindowss}
              alt="Four Power Windows uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(images.FourPowerWindowss)}
            />
          )}
        </Grid>

        {/* Air Bag Features */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Air Bag Features</InputLabel>
            <Select
              name="AirBagFeatures"
              value={formData.AirBagFeatures}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
            </Select>
          </FormControl>
          <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } variant="contained" color="primary">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" className="cursor-pointer flex items-center">
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {images.AirBagFeaturess && (
            <img
              src={images.AirBagFeaturess}
              alt="Air Bag Features uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(images.AirBagFeaturess)}
            />
          )}
        </Grid>

        {/* Music System */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Music System</InputLabel>
            <Select
              name="MusicSystem"
              value={formData.MusicSystem}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
            </Select>
          </FormControl>
          <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } variant="contained" color="primary">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" className="cursor-pointer flex items-center">
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {images.MusicSystems && (
            <img
              src={images.MusicSystems}
              alt="Music System uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(images.MusicSystems)}
            />
          )}
        </Grid>

        {/* Sunroof */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sunroof</InputLabel>
            <Select
              name="Sunroof"
              value={formData.Sunroof}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
            </Select>
          </FormControl>
          <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } variant="contained" color="primary">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" className="cursor-pointer flex items-center">
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {images.Sunroofs && (
            <img
              src={images.Sunroofs}
              alt="Sunroof uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(images.Sunroofs)}
            />
          )}
        </Grid>

        {/* ABS */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>ABS</InputLabel>
            <Select
              name="ABS"
              value={formData.ABS}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
            </Select>
          </FormControl>
          <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } variant="contained" color="primary">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" className="cursor-pointer flex items-center">
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {images.ABSs && (
            <img
              src={images.ABSs}
              alt="ABS uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(images.ABSs)}
            />
          )}
        </Grid>

        {/* Interior Parking Sensor */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Interior Parking Sensor</InputLabel>
            <Select
              name="InteriorParkingSensor"
              value={formData.InteriorParkingSensor}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
            </Select>
          </FormControl>
          <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } variant="contained" color="primary">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" className="cursor-pointer flex items-center">
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {images.InteriorParkingSensors && (
            <img
              src={images.InteriorParkingSensors}
              alt="Interior Parking Sensor uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(images.InteriorParkingSensors)}
            />
          )}
        </Grid>

        {/* Electrical Wiring */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Electrical Wiring</InputLabel>
            <Select
              name="Electricalwiring"
              value={formData.Electricalwiring}
              onChange={handleChange}
            >
              <MenuItem value="Not Working">Not Working</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="Damage">Damage</MenuItem>
            </Select>
          </FormControl>
          <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } variant="contained" color="primary">
            Open Camera
            </Button>
          </div>
          ): (
            <label htmlFor="upload-MusicSystems" className="cursor-pointer flex items-center">
            <CloudUploadIcon />
            <span className="ml-2">Upload Image</span>
          </label>
          )}
          </div>
          {images.Electricalwirings && (
            <img
              src={images.Electricalwiring}
              alt="Electrical Wiring uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => handleImageClick(images.Electricalwirings)}
            />
          )}
        </Grid>
      </Grid>

    <Modal
        open={captureModalOpen}
        onClose={() => setCaptureModalOpen(false)}
        // className={classes.modal}
      >
        <div className={classes.paper}>
          <UploadImage4
            isOpen={captureModalOpen}
            onClose={() => setCaptureModalOpen(false)}
            onCapture={handleCaptureImage}
            handleCaptureImage = {handleFileChange}
            selectfiled = {selectedLable}
          />
        </div>
 
       
      </Modal>
    </div>
  );
};

export default Electrical;
