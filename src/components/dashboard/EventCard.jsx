'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, DollarSign, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent } from '@/app/redux/slice'
import { BaseApiUrl } from "@/utils/constants"
import { toast } from 'sonner'

export function EventCard({ event, index }) {
  const dispatch = useDispatch()
  const selectedEventId = useSelector((store) => store.eventid)
  const [eventid, setEventid] = useState('')
  const router = useRouter()
  const [code, setCode] = useState('')
  const [isCodeVisible, setIsCodeVisible] = useState(false)

  useEffect(() => {
    setEventid(localStorage?.getItem('eventid'))
  }, [])

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

  const getCode = async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/joinevent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventid: event._id })
      })
      const json = await response.json()
      if (json && json.event && json.event.otpdegit) {
        setCode(json.event.otpdegit)
        setIsCodeVisible(true)
      }
    } catch (error) {
      console.error('Error generating code:', error)
      toast.error('Failed to generate code. Please try again.')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => toast.success('Code copied to clipboard'))
      .catch(() => toast.error('Failed to copy code'))
  }

  const setEvent = () => {
    dispatch(addEvent(event._id))
  }

  const isSelected = selectedEventId === event._id

  return (
    <motion.div variants={cardVariants}>
      <Card 
        onClick={setEvent} 
        className={`overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
        }`}
      >
        <CardHeader className="relative p-0 h-48">
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: `url(${event.eventurl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
          <CardTitle className="absolute bottom-4 left-4 text-2xl font-bold text-white">
            {event.eventname}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="mr-2 h-5 w-5 text-blue-500" />
            <span>{new Date(event.eventdate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="mr-2 h-5 w-5 text-blue-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="mr-2 h-5 w-5 text-blue-500" />
            <span>Rs. {event.budget}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold">
              {event.eventtype}
            </span>
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                getCode()
              }}
              variant="outline"
              size="sm"
            >
              Generate Code
            </Button>
          </div>
          {isCodeVisible && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
            >
              <span className="font-mono text-lg">{code}</span>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  copyToClipboard()
                }}
                variant="ghost"
                size="icon"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}