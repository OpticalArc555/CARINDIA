/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import WindshieldAndLights from "./ExteriorsComponent/WindshieldAndLights";
import Tyre from "./ExteriorsComponent/Tyre";
import { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Grid, Typography, Button, Modal, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useGetInspectionReportQuery, useInspectionReportMutation } from '../../services/inspectorapi';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import UploadImage4 from '../../ui/UploadImageComponents/UploadImage4';
import { useAddBiddingCarWithoutImageMutation } from "../../services/inspectorapi"
import OtherComponent from "./ExteriorsComponent/OtherComponent"
import Structure from "./ExteriorsComponent/Structure"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    maxWidth: "90%",
    maxHeight: "90%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
}));

const Exterior = () => {
  const classes = useStyles();
  const { beadingCarId } = useParams();
  console.log(beadingCarId);
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "Exterior" });
  console.log(data);
  
const [formData, setFormData] = useState({
    BonnetHood: [],
    RightDoorFront: [],
    LeftDoorFront: [],
    RightFender: [],
    LeftQuarterPanel: [],
    RightQuarterPanel: [],
    Roof: [],
    DickyDoor: [],
    LeftDoorRear: [],
    RightDoorRear: [],
    LHSFrontTyre: [],
    RHSFrontTyre: [],
    LHSRearTyre: [],
    RHSRearTyre: [],
    SpareTyre: [],
    Windshield: [],
    Light: [],
    FrontBumper: [],
    RearBumper: [],
    LHSHeadlight: [],
    RHSHeadlight: [],
    LHSTaillight: [],
    RHSTaillight: [],
    HeadLightSupport: [],
    RadiatorSupport: [],
    AlloyWheel: [],
    CowlTop:[],
    BootFloor:[],
    RightApronLEG:[],
    LeftApronLEG : [],
    RightApron : [],
    LeftApron : [],
    LeftPillar : [],
    RightPillar : []
  });

 const [uploadedImages, setUploadedImages] = useState({
    BonnetHoods: null,
    RightDoorFronts: null,
    LeftDoorFronts: null,
    RightFenders: null,
    LeftQuarterPanels: null,
    RightQuarterPanels: null,
    Roofs: null,
    DickyDoors: null,
    LeftDoorRears: null,
    RightDoorRears: null,
    LHSFrontTyres: null,
    RHSFrontTyres: null,
    LHSRearTyres: null,
    RHSRearTyres: null,
    SpareTyres: null,
    Windshields: null,
    Lights: null,
    FrontBumpers: null,
    RearBumpers: null,
    LHSHeadlights: null,
    RHSHeadlights: null,
    LHSTaillights: null,
    RHSTaillights: null,
    HeadLightSupports: null,
    RadiatorSupports: null,
    AlloyWheels: null,
    CowlTops : null,
    BootFloors: null,
    RightApronLEGs: null,
    LeftApronLEGs: null,
    RightAprons: null,
    LeftAprons: null,
    LeftPillars: null,
    RightPillars: null,
  });
  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "BonnetHood":
          setFormData((prev) => ({ ...prev, BonnetHood: item.comment }));
          setUploadedImages((prev) => ({ ...prev, BonnetHoods: item.documentLink }));
          break;
        case "RightDoorFront":
          setFormData((prev) => ({ ...prev, RightDoorFront: item.comment }));
          setUploadedImages((prev) => ({ ...prev, RightDoorFronts: item.documentLink }));
          break;
        case "LeftDoorFront":
          setFormData((prev) => ({ ...prev, LeftDoorFront: item.comment }));
          setUploadedImages((prev) => ({ ...prev, LeftDoorFronts: item.documentLink }));
          break;
        case "RightFender":
          setFormData((prev) => ({ ...prev, RightFender: item.comment }));
          setUploadedImages((prev) => ({ ...prev, RightFenders: item.documentLink }));
          break;
        case "LeftQuarterPanel":
          setFormData((prev) => ({ ...prev, LeftQuarterPanel: item.comment }));
          setUploadedImages((prev) => ({ ...prev, LeftQuarterPanels: item.documentLink }));
          break;
        case "RightQuarterPanel":
          setFormData((prev) => ({ ...prev, RightQuarterPanel: item.comment }));
          setUploadedImages((prev) => ({ ...prev, RightQuarterPanels: item.documentLink }));
          break;
        case "Roof":
          setFormData((prev) => ({ ...prev, Roof: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Roofs: item.documentLink }));
          break;
        case "DickyDoor":
          setFormData((prev) => ({ ...prev, DickyDoor: item.comment }));
          setUploadedImages((prev) => ({ ...prev, DickyDoors: item.documentLink }));
          break;
        case "LeftDoorRear":
          setFormData((prev) => ({ ...prev, LeftDoorRear: item.comment }));
          setUploadedImages((prev) => ({ ...prev, LeftDoorRears: item.documentLink }));
          break;
        case "RightDoorRear":
          setFormData((prev) => ({ ...prev, RightDoorRear: item.comment }));
          setUploadedImages((prev) => ({ ...prev, RightDoorRears: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);
  const [inspectionReport] = useInspectionReportMutation();
  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation()
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable ,setSelectedLable] = useState("");
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("")
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(selectfiled)
  console.log(lables)

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;
console.log(userRole)

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
        documentType: "InspectionReport",
        beadingCarId: beadingCarId,
        doc: "",
        doctype: "Exterior",
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

  const handleCaptureImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setCaptureModalOpen(false); // Close the camera modal after capturing the image
  };

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="p-4">
      
      <Typography variant="h4" className="text-black font-bold pb-5">
        Exterior Panel
      </Typography>
      <Grid container spacing={3}>
        {/* Bonnet Hood */}
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Bonnet Hood</InputLabel>
          <Select
            required
            name="BonnetHood"
            value={formData.BonnetHood}
            onChange={handleChange}
          >
            <MenuItem value="Repainted">Repainted</MenuItem>
            <MenuItem value="Dented">Dented</MenuItem>
            <MenuItem value="Scratched">Scratched</MenuItem>
            <MenuItem value="Rusted">Rusted</MenuItem>
            <MenuItem value="Repaired">Repaired</MenuItem>
            <MenuItem value="Damaged">Damaged</MenuItem>
            <MenuItem value="Faded">Faded</MenuItem>
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
        {uploadedImages.BonnetHoods && (
          <img
            src={uploadedImages.BonnetHoods}
            alt="Uploaded"
            style={{
              maxWidth: "20%",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(uploadedImages.BonnetHoods)}
          />
        )}
      </Grid>

      {/* Right Door Front */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Right Door Front</InputLabel>
          <Select
            name="RightDoorFront"
            value={formData.RightDoorFront}
            onChange={handleChange}
          >
            <MenuItem value="Repainted">Repainted</MenuItem>
            <MenuItem value="Dented">Dented</MenuItem>
            <MenuItem value="Scratched">Scratched</MenuItem>
            <MenuItem value="Rusted">Rusted</MenuItem>
            <MenuItem value="Repaired">Repaired</MenuItem>
            <MenuItem value="Damaged">Damaged</MenuItem>
            <MenuItem value="Faded">Faded</MenuItem>
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
        {uploadedImages.RightDoorFronts && (
          <img
            src={uploadedImages.RightDoorFronts}
            alt="Uploaded"
            style={{
              maxWidth: "20%",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(uploadedImages.RightDoorFronts)}
          />
        )}
      </Grid>

        {/* Left Door Front */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Left Door Front</InputLabel>
            <Select
              name="LeftDoorFront"
              value={formData.LeftDoorFront}
              onChange={handleChange}
            >
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.LeftDoorFronts && (
            <img
              src={uploadedImages.LeftDoorFronts}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftDoorFronts)}
            />
          )}
        </Grid>

        {/* Right Fender */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Right Fender</InputLabel>
            <Select
              name="RightFender"
              value={formData.RightFender}
              onChange={handleChange}
            >
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.RightFenders && (
            <img
              src={uploadedImages.RightFenders}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightFenders)}
            />
          )}
        </Grid>

        {/* Left Quarter Panel */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Left Quarter Panel</InputLabel>
            <Select
              name="LeftQuarterPanel"
              value={formData.LeftQuarterPanel}
              onChange={handleChange}
            >
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.LeftQuarterPanels && (
            <img
              src={uploadedImages.LeftQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftQuarterPanels)}
            />
          )}
        </Grid>

        {/* Right Quarter Panel */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Right Quarter Panel</InputLabel>
            <Select
              name="RightQuarterPanel"
              value={formData.RightQuarterPanel}
              onChange={handleChange}
            >
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.RightQuarterPanels && (
            <img
              src={uploadedImages.RightQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightQuarterPanels)}
            />
          )}
        </Grid>

        {/* Roof */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Roof</InputLabel>
            <Select name="Roof" value={formData.Roof} onChange={handleChange}>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.Roofs && (
            <img
              src={uploadedImages.Roofs}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.Roofs)}
            />
          )}
        </Grid>

        {/* Dicky Door */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Dicky Door</InputLabel>
            <Select
              name="DickyDoor"
              value={formData.DickyDoor}
              onChange={handleChange}
            >
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.DickyDoors && (
            <img
              src={uploadedImages.DickyDoors}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.DickyDoors)}
            />
          )}
        </Grid>

        {/* Left Door Rear */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Left Door Rear</InputLabel>
            <Select
              name="LeftDoorRear"
              value={formData.LeftDoorRear}
              onChange={handleChange}
            >
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.LeftDoorRears && (
            <img
              src={uploadedImages.LeftDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftDoorRears)}
            />
          )}
        </Grid>

        {/* Right Door Rear */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Right Door Rear</InputLabel>
            <Select
              name="RightDoorRear"
              value={formData.RightDoorRear}
              onChange={handleChange}
            >
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
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
          {uploadedImages.RightDoorRears && (
            <img
              src={uploadedImages.RightDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightDoorRears)}
            />
          )}
        </Grid>
      </Grid>

      {/* Modal for displaying clicked image */}
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

      <WindshieldAndLights 
      handleCameraModal={handleCameraModal} 
      userRole={userRole} 
      handleCaptureImage={handleCaptureImage} 
      handleSubmitWithoutImage={handleSubmitWithoutImage} 
      data={data} 
      formData={formData} 
      setFormData={setFormData} 
      handleFileChange={handleFileChange} 
      uploadedImages={uploadedImages} 
      setUploadedImages={setUploadedImages}
      captureModalOpen={captureModalOpen}
      setCaptureModalOpen={setCaptureModalOpen}
      selectedLable={selectedLable}
      setSelectfiled={setSelectfiled}
      handleChange={handleChange}
    />
<Tyre/>
<OtherComponent  handleCameraModal={handleCameraModal} 
      userRole={userRole} 
      handleCaptureImage={handleCaptureImage} 
      handleSubmitWithoutImage={handleSubmitWithoutImage} 
      data={data} 
      formData={formData} 
      setFormData={setFormData} 
      handleFileChange={handleFileChange} 
      uploadedImages={uploadedImages} 
      setUploadedImages={setUploadedImages}
      captureModalOpen={captureModalOpen}
      setCaptureModalOpen={setCaptureModalOpen}
      selectedLable={selectedLable}
      setSelectfiled={setSelectfiled}
      handleChange={handleChange}/>

<Structure  handleCameraModal={handleCameraModal} 
      userRole={userRole} 
      handleCaptureImage={handleCaptureImage} 
      handleSubmitWithoutImage={handleSubmitWithoutImage} 
      data={data} 
      formData={formData} 
      setFormData={setFormData} 
      handleFileChange={handleFileChange} 
      uploadedImages={uploadedImages} 
      setUploadedImages={setUploadedImages}
      captureModalOpen={captureModalOpen}
      setCaptureModalOpen={setCaptureModalOpen}
      selectedLable={selectedLable}
      setSelectfiled={setSelectfiled}
      handleChange={handleChange}/>


{/* <div className="flex justify-end mt-10 px-8">
        
        <Button variant="contained" color="primary">
          Next
        </Button> 
      </div> */}
    </div>
  );
};

export default Exterior;