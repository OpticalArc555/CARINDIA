import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAddCircleOutline, IoCloseCircle } from "react-icons/io5";

const EditImage = () => {
  const navigate = useNavigate();

  // Initial array of static image URLs
  const initialImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/250',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/350',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/450',
    'https://via.placeholder.com/500',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/350',
  ];

  const [images, setImages] = useState(initialImages);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSubmit = () => {
    // Implement your cancel logic here
    navigate('/'); // For example, navigate to the homepage
  };

  const handleAddImage = (event) => {
    const newImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-8xl p-4">
        <h2 className="text-3xl font-semibold mb-4">Edit Images</h2>
        <div className="overflow-y-auto overflow-hidden " style={{ maxHeight: '80vh' }}>
          <div className="grid grid-cols-5 gap-4">
            {images.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-auto"
                  style={{
                    maxWidth: '500px',
                    maxHeight: '500px',
                    margin: '5px',
                  }}
                />
                <IoCloseCircle
                  className="absolute h-8 w-8 top-2 right-2 cursor-pointer text-red-500"
                  onClick={() => handleDeleteImage(index)}
                />
              </div>
            ))}
            <div className="flex items-center justify-center border-2 border-dashed border-gray-400 p-4">
              <label className="cursor-pointer">
                <IoAddCircleOutline className="h-12 w-12 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddImage}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <button
            className="p-3 bg-indigo-400 rounded-md w-28 text-white"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="p-3 bg-green-400 rounded-md w-28 text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
