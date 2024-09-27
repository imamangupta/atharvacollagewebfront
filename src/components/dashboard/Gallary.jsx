import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const Gallary = () => {
  const [images, setImages] = useState([
    {
      url: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg",
    },
    {
      url: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg",
    },
    {
      url: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg",
    },
    {
      url: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg",
    },
    {
      url: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg",
    },
    {
      url: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg",
    },
  ]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const getImages = async () => {
    const url = "";
    try {
      const res = await fetch(`${url}`);
      if (!res) console.log(`${res.error}`);
      const data = await res.json();
      console.log(`${data}`);
    } catch (error) {
      console.log(`Error fetching Gallary Imgs : ${error}`);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      {/* Upload Button */}
      <motion.div className="flex flex-col items-center">
        <Button className="bg-green-600 hover:bg-green-400">
          <label htmlFor="image-upload" className="cursor-pointer">
            Upload Images
          </label>
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
      </motion.div>

      {/* Image Gallery */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative border rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image.url}
              alt={`upload-preview-${index}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Gallary;
