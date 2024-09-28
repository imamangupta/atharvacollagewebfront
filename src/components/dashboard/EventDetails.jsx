'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, UsersIcon, DollarSignIcon, ClockIcon, MapPinIcon, UserIcon, StarIcon, MessageSquareIcon, BellIcon, DownloadIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from 'react-hot-toast'

// Assuming you have an action creator for updating the event
// import { updateEvent } from '@/store/eventSlice'

// Mock event data (replace with actual data fetching logic)
const mockEventData = {
  id: '1',
  name: 'Tech Conference 2024',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop',
  budget: 50000,
  members: [
    { id: 1, name: 'John Doe', role: 'Organizer', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', role: 'Speaker', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Alice Johnson', role: 'Attendee', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Bob Williams', role: 'Sponsor', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Carol Brown', role: 'Volunteer', avatar: 'https://i.pravatar.cc/150?img=5' },
  ],
  date: '2024-06-15',
  description: 'Join us for the biggest tech conference of the year, featuring industry leaders and innovative workshops.',
  location: 'San Francisco Convention Center, CA',
  agenda: [
    { time: '09:00 AM', title: 'Registration and Breakfast' },
    { time: '10:00 AM', title: 'Keynote Speech: The Future of AI' },
    { time: '11:30 AM', title: 'Panel Discussion: Cybersecurity Challenges' },
    { time: '01:00 PM', title: 'Lunch Break' },
    { time: '02:00 PM', title: 'Workshop: Building Scalable Cloud Solutions' },
    { time: '04:00 PM', title: 'Networking Session' },
    { time: '05:30 PM', title: 'Closing Remarks' },
  ],
  sponsors: [
    { id: 1, name: 'TechCorp', logo: 'https://via.placeholder.com/150?text=TechCorp' },
    { id: 2, name: 'InnovateSoft', logo: 'https://via.placeholder.com/150?text=InnovateSoft' },
    { id: 3, name: 'CloudMasters', logo: 'https://via.placeholder.com/150?text=CloudMasters' },
  ],
  reviews: [
    { id: 1, user: 'Tech Enthusiast', rating: 5, comment: 'Absolutely amazing conference! Learned so much.' },
    { id: 2, user: 'AI Researcher', rating: 4, comment: 'Great insights into the future of AI. Looking forward to next year!' },
  ]
}

export default function EventDetails() {
  const params = useParams()
  const dispatch = useDispatch()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('details')
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedEvent, setEditedEvent] = useState(null)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const eventIdFromRedux = useSelector((store) => store.eventId)

  const fetchEvent = useCallback(async () => {
    setLoading(true)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setEvent(mockEventData)
    } catch (error) {
      console.error('Error fetching event:', error)
      toast.error('Failed to load event data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent, params.id, eventIdFromRedux])

  const handleEdit = () => {
    setIsEditMode(true)
    setEditedEvent({ ...event })
  }

  const handleSave = () => {
    dispatch(updateEvent(editedEvent))
    setEvent(editedEvent)
    setIsEditMode(false)
    toast.success('Event updated successfully')
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setEditedEvent(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedEvent(prev => ({ ...prev, [name]: value }))
  }

  const handleAddReview = () => {
    const updatedEvent = {
      ...event,
      reviews: [...event.reviews, { id: Date.now(), user: 'Anonymous', ...newReview }]
    }
    setEvent(updatedEvent)
    dispatch(updateEvent(updatedEvent))
    setShowReviewDialog(false)
    setNewReview({ rating: 5, comment: '' })
    toast.success('Review added successfully')
  }

  const handleDownloadAgenda = () => {
    const agenda = event.agenda.map(item => `${item.time} - ${item.title}`).join('\n')
    const blob = new Blob([agenda], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'event_agenda.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Agenda downloaded successfully')
  }

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

  const TabContent = ({ id, active, children }) => (
    <AnimatePresence mode="wait">
      {active === id && (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )

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
            {isEditMode ? (
              <Input
                name="name"
                value={editedEvent.name}
                onChange={handleInputChange}
                className="bg-transparent text-white border-white"
              />
            ) : (
              event.name
            )}
          </h1>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            {isEditMode ? (
              <>
                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
                  Save Changes
                </Button>
                <Button onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white">
                Edit Event
              </Button>
            )}
          </div>
          <Button onClick={handleDownloadAgenda} className="bg-blue-500 hover:bg-blue-600 text-white">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download Agenda
          </Button>
        </div>

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
            <p className="mt-2 text-blue-600">
              {isEditMode ? (
                <Input
                  type="date"
                  name="date"
                  value={editedEvent.date}
                  onChange={handleInputChange}
                  className="bg-transparent text-blue-600 border-blue-300"
                />
              ) : (
                event.date
              )}
            </p>
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
            <p className="mt-2 text-blue-600">
              {isEditMode ? (
                <Input
                  type="number"
                  name="budget"
                  value={editedEvent.budget}
                  onChange={handleInputChange}
                  className="bg-transparent text-blue-600 border-blue-300"
                />
              ) : (
                `$${event.budget.toLocaleString()}`
              )}
            </p>
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
            <p className="mt-2 text-blue-600">{event.members.length}</p>
          </motion.div>
        </div>

        <div className="mb-8">
          <div className="flex border-b border-blue-200 overflow-x-auto">
            {['details', 'agenda', 'members', 'sponsors', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-blue-400 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <TabContent id="details" active={activeTab}>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Event Description</h2>
            {isEditMode ? (
              <Textarea
                name="description"
                value={editedEvent.description}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
            ) : (
              <p className="text-blue-600 mb-4">{event.description}</p>
            )}
            <div className="flex items-center text-blue-600 mb-2">
              <MapPinIcon className="mr-2" />
              <span>
                {isEditMode ? (
                  <Input
                    name="location"
                    value={editedEvent.location}
                    onChange={handleInputChange}
                    className="bg-transparent text-blue-600 border-blue-300"
                  />
                ) : (
                  event.location
                )}
              </span>
            </div>
            <div className="flex items-center text-blue-600">
              <ClockIcon className="mr-2" />
              <span>Starts at 9:00 AM</span>
            </div>
          </motion.div>
        </TabContent>

        <TabContent id="agenda" active={activeTab}>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Event Agenda</h2>
            <ul className="space-y-4">
              {event.agenda.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 font-semibold w-24">{item.time}</span>
                  <span className="text-blue-700">{item.title}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </TabContent>

        <TabContent id="members" active={activeTab}>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Event Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.members.map((member) => (
                <div key={member.id} className="flex items-center bg-blue-50 p-3 rounded-md">
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <span className="font-semibold text-blue-700">{member.name}</span>
                    <span className="text-blue-500 text-sm block">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabContent>

        <TabContent id="sponsors" active={activeTab}>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Event Sponsors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.sponsors.map((sponsor) => (
                <div key={sponsor.id} className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                  <img src={sponsor.logo} alt={sponsor.name} className="w-32 h-32 object-contain mb-2" />
                  <span className="text-blue-600 font-semibold text-center">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </TabContent>

        <TabContent id="reviews" active={activeTab}>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-800">Event Reviews</h2>
              <Button onClick={() => setShowReviewDialog(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
                Add Review
              </Button>
            </div>
            <div className="space-y-4">
              {event.reviews.map((review) => (
                <div key={review.id} className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-blue-700 mr-2">{review.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-blue-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </TabContent>
      </div>

      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button onClick={handleAddReview} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}