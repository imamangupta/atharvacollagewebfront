'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, UsersIcon, DollarSignIcon } from 'lucide-react'
import { useSelector } from 'react-redux';
import { BaseApiUrl } from '@/utils/constants';

export default function EventDetails() {

  const dataquesiton = useSelector((store) => store.eventid);

  const [userdata, setuserdata] = useState([])
  const [dataevent, setdataevent] = useState()




  const fetchalldata = async () => {
    const response = await fetch(`${BaseApiUrl}/event/all`, {
      method: 'GET',
      headers: {
        'eventid': dataquesiton
      },
    })
    const json = await response.json()

    if (json) {
      console.log(json);
      setuserdata(json.newdata)
      setdataevent(json.data)


    }

  }

  useEffect(() => {
    fetchalldata()

  }, [])


  return (
    <div className="bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-64 md:h-96">
          <img
            src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop'
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
          <h1 className="absolute bottom-4 left-4 text-4xl font-bold text-white">
            {dataevent?.eventname}
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
            <p className="mt-2 text-blue-600">{dataevent?.eventdate}</p>
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
            <p className="mt-2 text-blue-600">{dataevent?.budget}</p>
          </motion.div>

          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <UsersIcon className="text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Locations</h2>
            </div>
            <p className="mt-2 text-blue-600">{dataevent?.location}</p>
          </motion.div>
        </div>

        {userdata.map((data, index) => (
          
            <motion.div key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-1">{index + 1}.{data?.userName}</h2>
              {/* <p className="text-blue-600">{event.description}</p> */}
            </motion.div>

        ))}

        {/* <motion.div
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
        </motion.div> */}
      </div>
    </div>
  )
}