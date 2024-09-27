'use client'

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Upload, ChevronLeft, ChevronRight } from "lucide-react"

const dummyImages = [
  { id: 1, url: "/placeholder.svg?height=300&width=200", aspectRatio: 2/3 },
  { id: 2, url: "/placeholder.svg?height=300&width=300", aspectRatio: 1 },
  { id: 3, url: "/placeholder.svg?height=300&width=400", aspectRatio: 4/3 },
  { id: 4, url: "/placeholder.svg?height=400&width=300", aspectRatio: 3/4 },
  { id: 5, url: "/placeholder.svg?height=300&width=200", aspectRatio: 2/3 },
  { id: 6, url: "/placeholder.svg?height=300&width=300", aspectRatio: 1 },
  { id: 7, url: "/placeholder.svg?height=300&width=400", aspectRatio: 4/3 },
  { id: 8, url: "/placeholder.svg?height=400&width=300", aspectRatio: 3/4 },
  { id: 9, url: "/placeholder.svg?height=300&width=200", aspectRatio: 2/3 },
  { id: 10, url: "/placeholder.svg?height=300&width=300", aspectRatio: 1 },
  { id: 11, url: "/placeholder.svg?height=300&width=400", aspectRatio: 4/3 },
  { id: 12, url: "/placeholder.svg?height=400&width=300", aspectRatio: 3/4 },
  { id: 13, url: "/placeholder.svg?height=300&width=200", aspectRatio: 2/3 },
  { id: 14, url: "/placeholder.svg?height=300&width=300", aspectRatio: 1 },
  { id: 15, url: "/placeholder.svg?height=300&width=400", aspectRatio: 4/3 },
]

const ITEMS_PER_PAGE = 10

export default function Gallery() {
  const [images, setImages] = useState(dummyImages)
  const [currentPage, setCurrentPage] = useState(1)

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            resolve({
              id: images.length + index + 1,
              url: e.target.result,
              aspectRatio: img.width / img.height,
            })
          }
          img.src = e.target.result
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(newImages).then((uploadedImages) => {
      setImages((prevImages) => [...prevImages, ...uploadedImages])
    })
  }

  const handleDownload = (imageUrl) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = "pinterest-image.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const indexOfLastImage = currentPage * ITEMS_PER_PAGE
  const indexOfFirstImage = indexOfLastImage - ITEMS_PER_PAGE
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

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
                  src={image.url}
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

      <div className="flex justify-center items-center mt-8 space-x-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            variant={currentPage === page ? "default" : "outline"}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}