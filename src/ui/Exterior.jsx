/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAddCarImagesMutation } from '../services/dealerAPI';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { useDealerIdByCarQuery } from '../services/carAPI';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Exterior() {
  const [openDialog, setOpenDialog] = useState(false);
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [images4, setImages4] = useState([]);
  const [document, setDocument] = useState('');
  const { id } = useParams();
  const token = Cookies.get('token');
  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;
  const { data } = useDealerIdByCarQuery({ id, pageNo: 0 });

  const firstCarId = data?.list?.length > 0 ? data?.list[0].carId : null;
  console.log(firstCarId);

  const [addCarImages] = useAddCarImagesMutation();

  const readImages = (event, setImageFunction) => {
    const files = Array.from(event.target.files);
    setImageFunction(files);
  };

  const handleSubmit = async (images) => {
    if (!firstCarId || !images.length) {
      console.error('firstCarId or images is not defined');
      return;
    }

    const formData = new FormData();
    for (const image of images) {
      formData.append('image', image);
    }

    try {
      const response = await addCarImages({
        formData,
        document,
        firstCarId,
        UserID,
      }).unwrap();
      console.log(response);
      toast.success("Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (document) {
      handleSubmit();
    }
  }, [document]);

  return (
    <div className=" ">
      <Button
        type="button"
        className="bg-indigo-500 w-64 h-10 text-white"
        onClick={handleOpenDialog}
      >
        Upload Exterior Car Images
      </Button>
      <Dialog open={openDialog} handler={setOpenDialog} size="md" dismiss={{ backdrop: false }}>
        <ToastContainer />
        <DialogHeader>Upload Exterior Car Images</DialogHeader>
        <DialogBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDocument('Exterior');
              handleSubmit(images1);
            }}
            className="flex flex-col space-y-2"
          >
            <div className="flex space-x-2 space-y-2">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => readImages(e, setImages1)}
              />
              <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                Upload
              </Button>
            </div>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDocument('Exterior');
              handleSubmit(images2);
            }}
            className="flex flex-col space-y-2"
          >
            <div className="flex space-x-2 space-y-2">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => readImages(e, setImages2)}
              />
              <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                Upload
              </Button>
            </div>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDocument('Exterior');
              handleSubmit(images3);
            }}
            className="flex flex-col space-y-2"
          >
            <div className="flex space-x-2 space-y-2">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => readImages(e, setImages3)}
              />
              <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                Upload
              </Button>
            </div>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDocument('Exterior');
              handleSubmit(images4);
            }}
            className="flex flex-col space-y-2"
          >
            <div className="flex space-x-2 space-y-2">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => readImages(e, setImages4)}
              />
              <Button type="submit" className="bg-indigo-500 w-40 h-10 text-white">
                Upload
              </Button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            type="button"
            className="bg-red-500 w-40 h-10 mr-[7rem] text-white"
            onClick={handleCloseDialog}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
