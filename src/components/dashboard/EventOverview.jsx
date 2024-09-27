'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Plus, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { EventCard } from './EventCard'
import { JoinEventModal } from './JoinEventModal'
import { CreateEventModal } from './CreateEventModal'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BaseApiUrl } from '@/utils/constants'

export function EventOverview({ userdata }) {
  const router = useRouter()
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Summer Wedding',
      date: 'August 15, 2023',
      attendees: 75,
      budget: 25000,
      location: 'Sunset Beach Resort',
      eventType: 'wedding',
      image: ''
    },
    {
      id: 2,
      name: 'Tech Conference 2023',
      date: 'September 22, 2023',
      attendees: 500,
      budget: 100000,
      location: 'Downtown Convention Center',
      eventType: 'conference',
      image: ''
    },
  ])
  const [myEvent, setMyEvent] = useState([])
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinEvent = async (code) => {
    setIsLoading(true)
    try {
      // Simulating join event action
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`Joined event with code: ${code}`)
      setIsJoinModalOpen(false)
    } catch (error) {
      console.error('Failed to join event:', error)
      toast.error("Failed to join event. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateEvent = async (eventData) => {
    setIsLoading(true)
    try {


      const data = new FormData();

      data.append("file", eventData.image);
      data.append("upload_preset", "kfdvzoaz");
      data.append("cloud_name", "dggd6cvzh");
      // CLOUDINARY_URL=cloudinary://383736856582798:VATPzuynv5I_0lkdHMdnrYNakYk@dggd6cvzh


      if (eventData.image === null) {
        return console.log('work..');
      }

      const res = await fetch('https://api.cloudinary.com/v1_1/dggd6cvzh/image/upload', {
        method: "POST",
        body: data
      })

      const cloudData = await res.json();


      console.log(userdata);

      const response = await fetch(`${BaseApiUrl}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventname: eventData.name, eventdate: eventData.date, location: eventData.location, budget: eventData.budget, eventtype: eventData.eventType, eventurl: cloudData.url, createdby: userdata.id })
      })
      const json = await response.json()

      if (json) {
        console.log('update data..');
        console.log(json);

        setIsCreateModalOpen(false)
        toast.success(`Created new event: ${eventData.name}`)
        router.push("/dashboard")
      } else {
        toast.error("Invalid Credentials")
      }

    } catch (error) {
      console.error('Failed to create event:', error)
      toast.error("Failed to create event. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  const fetchEvent = async () => {
    const response = await fetch(`${BaseApiUrl}/event`, {
      method: 'GET',
      headers: {
        'userid': userdata?.id
      },
    })
    const json = await response.json()

    if (json) {
      console.log('userdata',userdata);
      
      console.log('event',json);
      setMyEvent(json.data)
    }
  }


  useEffect(() => {
    fetchEvent()
  }, [])


  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Event Overview</h1>
        <div className="space-x-4">
          <Button
            onClick={() => setIsJoinModalOpen(true)}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Join Event
          </Button>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </div>
      </motion.div>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {myEvent.map((event, index) => (
            <EventCard  event={event} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
      <JoinEventModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinEvent}
        isLoading={isLoading}
      />
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateEvent}
        isLoading={isLoading}
      />
    </div>
  )
}