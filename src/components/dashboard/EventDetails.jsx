'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { CalendarIcon, UsersIcon, DollarSignIcon } from 'lucide-react'

// Mock event data (replace with actual data fetching logic)
const mockEventData = {
  id: '1',
  name: 'Tech Conference 2024',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop',
  budget: 50000,
  members: 250,
  date: '2024-06-15',
  description: 'Join us for the biggest tech conference of the year, featuring industry leaders and innovative workshops.',
  location: 'San Francisco, CA'
}

export default function EventDetails() {
  const params = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const eventIdFromRedux = useSelector((store) => store.eventId)

  useEffect(() => {
    // Simulating data fetching
    const fetchEvent = async () => {
      // In a real app, you would fetch data based on params.id or eventIdFromRedux
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      setEvent(mockEventData)
      setLoading(false)
    }
    fetchEvent()
  }, [params.id, eventIdFromRedux])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!event) {
    return <div className="text-center text-2xl text-red-500">Event not found</div>
  }

  return (
    <div className="bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-64 md:h-96">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
          <h1 className="absolute bottom-4 left-4 text-4xl font-bold text-white">
            {event.name}
          </h1>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <CalendarIcon className="text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Date</h2>
            </div>
            <p className="mt-2 text-blue-600">{event.date}</p>
          </motion.div>

          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <DollarSignIcon className="text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Total Budget</h2>
            </div>
            <p className="mt-2 text-blue-600">${event.budget.toLocaleString()}</p>
          </motion.div>

          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <UsersIcon className="text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Total Members</h2>
            </div>
            <p className="mt-2 text-blue-600">{event.members}</p>
          </motion.div>
        </div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Event Description</h2>
          <p className="text-blue-600">{event.description}</p>
        </motion.div>

        <motion.div
          className="mt-8 bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Location</h2>
          <p className="text-blue-600">{event.location}</p>
        </motion.div>
      </div>
    </div>
  )
}