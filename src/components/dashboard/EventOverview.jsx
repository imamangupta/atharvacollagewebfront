'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Plus, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { EventCard } from './EventCard'
import { JoinEventModal } from './JoinEventModal'
import { CreateEventModal } from './CreateEventModal'
import { Toaster, toast } from 'sonner'

export function EventOverview() {
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
      // Simulating create event action
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newEvent = {
        id: events.length + 1,
        ...eventData,
        attendees: 0,
      
      }
      setEvents([...events, newEvent])
      setIsCreateModalOpen(false)
      toast.success(`Created new event: ${eventData.name}`)
    } catch (error) {
      console.error('Failed to create event:', error)
      toast.error("Failed to create event. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
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