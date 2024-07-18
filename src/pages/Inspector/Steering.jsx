/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Grid, Typography, Button, Modal, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useGetInspectionReportQuery, useInspectionReportMutation } from '../../services/inspectorapi';
import { useParams } from 'react-router-dom';
import { useAddBiddingCarWithoutImageMutation } from "../../services/inspectorapi"
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import UploadImage4 from '../../ui/UploadImageComponents/UploadImage4';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Steering = () => {
  const classes = useStyles();
  const { beadingCarId } = useParams();
  console.log(beadingCarId);
  const { data ,refetch} = useGetInspectionReportQuery({ beadingCarId, docType: "Steering" });
  console.log(data);
  const [formData, setFormData] = useState({
    Steering: '',
    Brake: '',
    Suspension: '',
  });
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;
console.log(userRole)
  const [uploadedImages, setUploadedImages] = useState({
    Steerings: null,
    Brakes: null,
    Suspensions: null,
  });

  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation()
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable ,setSelectedLable] = useState("");
  const [inspectionReport] = useInspectionReportMutation();
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

  console.log(selectfiled)
  console.log(lables)

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
        doctype: "Steering",
        subtype: lables,
        comment: selectfiled,
      };
 
      try {
        const res = await inspectionReport({ inspectionData, formDataToSend });
        refetch()
        console.log(res);
        if (res.data?.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
        } else {
          toast.error("Data Upload failed", { autoClose: 500 });
        }
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
    formDataToSend1.append('documentType', "InspectionReport");
    formDataToSend1.append('doc', "");
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
        case "Steering":
          setFormData((prev) => ({ ...prev, Steering: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Steerings: item.documentLink }));
          break;
        case "Brake":
          setFormData((prev) => ({ ...prev, Brake: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Brakes: item.documentLink }));
          break;
        case "Suspension":
          setFormData((prev) => ({ ...prev, Suspension: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Suspensions: item.documentLink }));
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

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key)
  }

  const handleCaptureImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setCaptureModalOpen(false); // Close the camera modal after capturing the image
  };

  return (
    <div>
      <div className='p-4'>
        <Typography variant="h4" className='text-black font-bold pb-5'>
          Steering
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Steering</InputLabel>
              <Select
                name="Steering"
                value={formData.Steering}
                onChange={handleChange}
              >
                <MenuItem value="Misfiring">Misfiring</MenuItem>
                <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
                <MenuItem value="Hard Noise"> Hard Noise</MenuItem>
              </Select>
            </FormControl>
             <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } size="small" variant="contained" color="success">
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
            {uploadedImages.Steerings && (
              <img
                src={uploadedImages.Steerings}
                alt="Uploaded"
                style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
                onClick={() => handleImageClick(uploadedImages.Steerings)}
              />
            )}
            
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Brake</InputLabel>
              <Select
                name="Brake"
                value={formData.Brake}
                onChange={handleChange}
              >
                <MenuItem value="Noisy">Noisy</MenuItem>
                <MenuItem value="Hard Noise">Hard Noise</MenuItem>
              </Select>
            </FormControl>
            <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } size="small" variant="contained" color="success">
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
            {uploadedImages.Brakes && (
              <img
                src={uploadedImages.Brakes}
                alt="Uploaded"
                style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
                onClick={() => handleImageClick(uploadedImages.Brakes)}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Suspension</InputLabel>
              <Select
                name="Suspension"
                value={formData.Suspension}
                onChange={handleChange}
              >
                <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
                <MenuItem value="Weak">Weak</MenuItem>
              </Select>
            </FormControl>
            <div className='flex'>  
            <Button onClick={handleSubmitWithoutImage} size="small" variant="contained" color="success" style={{ marginTop: '10px' }}>
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className='mt-3 ml-5'>
             <Button onClick={() => handleCameraModal("ABSs") } size="small" variant="contained" color="success">
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
            {uploadedImages.Suspensions && (
              <img
                src={uploadedImages.Suspensions}
                alt="Uploaded"
                style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
                onClick={() => handleImageClick(uploadedImages.Suspensions)}
              />
            )}
          </Grid>
        </Grid>
      </div>

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
    </div>
  );
};

export default Steering;
