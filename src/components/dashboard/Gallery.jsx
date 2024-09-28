'use client'

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import {  useSelector } from 'react-redux';
import { BaseApiUrl } from "@/utils/constants"

const dummyImages = [
  // { id: 1, url: "/placeholder.svg?height=300&width=200", aspectRatio: 2/3 },
  // { id: 2, url: "/placeholder.svg?height=300&width=300", aspectRatio: 1 },
  // { id: 3, url: "/placeholder.svg?height=300&width=400", aspectRatio: 4/3 },
  // { id: 4, url: "/placeholder.svg?height=400&width=300", aspectRatio: 3/4 },
  // { id: 5, url: "/placeholder.svg?height=300&width=200", aspectRatio: 2/3 },

]

const ITEMS_PER_PAGE = 100

export default function Gallery() {


  const dataquesiton = useSelector((store) => store.eventid);
  const [images, setImages] = useState(dummyImages)
  const [currentPage, setCurrentPage] = useState(1)
  const usermydata = useSelector((store) => store.userdata);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files); // Convert files to an array
  
    if (!files.length) {
      return console.log('No files selected');
    }
  
    // Prepare the promises for uploading each image to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'kfdvzoaz');
      data.append('cloud_name', 'dggd6cvzh');
  
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dggd6cvzh/image/upload', {
          method: 'POST',
          body: data,
        });
  
        const cloudData = await res.json();
  
        // Send the image URL to your backend after uploading to Cloudinary
        const response = await fetch(`${BaseApiUrl}/gallery`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventid: dataquesiton,  // Replace with your actual event ID
            imgurl: cloudData.url,
            userid: usermydata.id,  // Replace with your actual user ID
          }),
        });
  
        const json = await response.json();
        if (json) {
          console.log('Successfully updated data:', json);
        }
  
        return cloudData; // Return the cloudData for further use
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        return null; // Handle errors gracefully
      }
    });
  
    // Wait for all the image upload promises to complete
    const uploadedImages = await Promise.all(uploadPromises);
    const successfulUploads = uploadedImages.filter(Boolean); // Remove any failed uploads (null values)
  
    // Use FileReader to preview the uploaded images
    const previewPromises = files.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              id: index + 1,  // You can improve this ID logic if needed
              imgurl: e.target.result,
              aspectRatio: img.width / img.height,
            });
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    });
  
    const previews = await Promise.all(previewPromises);
  
    // Update the state with both successful uploads and image previews
    setImages((prevImages) => [
      ...prevImages,
      ...previews.map((preview, index) => ({
        ...preview,
        cloudinaryData: successfulUploads[index],  // Attach cloudinary data for further use
      })),
    ]);
  
    console.log('All images uploaded and previewed:', previews);
  };
  

  const handleDownload = (imageUrl) => {
    console.log(imageUrl);
    
    const link = document?.createElement("a")
    link.href = imageUrl
    link.download = "pinterest-image.jpg"
    document?.body.appendChild(link)
    link.click()
    document?.body.removeChild(link)
  }

  const indexOfLastImage = currentPage * ITEMS_PER_PAGE
  const indexOfFirstImage = indexOfLastImage - ITEMS_PER_PAGE
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }


  const fetchImages = async()=>{
    const response = await fetch(`${BaseApiUrl}/gallery`, {
      method: 'GET',
      headers: {
        'eventid': dataquesiton
      },
    })
    const json = await response.json()

    if (json.data) {
      console.log('userdata',json);
      setImages(json.data)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          <Upload className="mr-2 h-4 w-4" />
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
      </div>

      <motion.div
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {currentImages.map((image) => (
            <motion.div
              key={image.id}
              className="break-inside-avoid mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group">
                <img
                  src={image.imgurl}
                  alt={`Gallery image ${image.id}`}
                  className="w-full rounded-lg shadow-md"
                  style={{
                    aspectRatio: image.aspectRatio,
                    objectFit: "cover",
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <Button
                    className="bg-white text-black hover:bg-gray-200"
                    onClick={() => handleDownload(image.url)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}