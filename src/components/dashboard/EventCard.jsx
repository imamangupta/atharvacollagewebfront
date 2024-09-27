'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';

import { addEvent } from '@/app/redux/slice'
import { BaseApiUrl } from "@/utils/constants"

export function EventCard({ event, index }) {
  const dispatch = useDispatch();
  const dataquesiton = useSelector((store) => store.eventid);
  console.log(dataquesiton);

  const [eventid, setEventid] = useState('')
  const router = useRouter()
  useEffect(() => {
    setEventid(localStorage?.getItem('eventid'))
  }, [])
  

  const [code, setcode] = useState('')

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  }

  const getcode = async () => {
    console.log( 'welrk');
    
    const response = await fetch(`${BaseApiUrl}/joinevent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventid: event._id })
    })
    const json = await response.json()
    if (json) {
      // console.log(json.event[0].otpdegit);
      setcode(json.event.otpdegit)

    }
  }


  const setevent =()=>{
    dispatch(addEvent(event._id))
 
  }
  return (
    <motion.div variants={cardVariants}>
      {/* <Link href={`/event/${event._id}`}> */}
        <Card onClick={setevent} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 ${dataquesiton === event._id ?'bg-black':""} `}>
          <CardHeader className="relative p-0 h-48">
            <img
              src={event.eventurl}
              alt={event.eventname}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg object-fit"
              style={{ overflow: 'hidden' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <CardTitle className="absolute bottom-4 left-4 text-2xl font-bold text-white">
              {event.eventname}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="mr-2 h-5 w-5" />
              <span>{event.eventdate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{event.location}</span>
            </div>
            {/* <div className="flex items-center text-gray-600">
              <Users className="mr-2 h-5 w-5" />
              <span>{event.attendees} attendees</span>
            </div> */}
            <div className="flex items-center text-gray-600">
              <DollarSign className="mr-2 h-5 w-5" />
              <span>Rs. {event.budget}</span>
            </div>
            <div className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold">
              {event.eventtype}
            </div>
            <div>
              <Button onClick={getcode}>Generate Event Code</Button>
               <div>{code}</div>
            </div>
          </CardContent>
        </Card>
      {/* </Link> */}
    </motion.div>
  )
}