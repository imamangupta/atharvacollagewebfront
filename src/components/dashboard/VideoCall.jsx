"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { VideoIcon, PlusIcon } from "lucide-react"

export default function VideoCall() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: "Plan Karo",
      date: "2024-09-21",
    },
  ])

  const [newMeeting, setNewMeeting] = useState({
    name: "",
    date: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMeeting((prev) => ({ ...prev, [name]: value }))
  }

  const addMeeting = () => {
    if (newMeeting.name && newMeeting.date) {
      setMeetings((prev) => [
        ...prev,
        { id: prev.length + 1, ...newMeeting },
      ])
      setNewMeeting({ name: "", date: "" })
    }
  }

  const joinMeeting = (roomID) => {
    const url = `/meeting/${roomID}`
    window.open(url, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-semibold mb-6 text-blue-600">Video Call Meetings</h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          placeholder="Meeting Name"
          value={newMeeting.name}
          onChange={handleInputChange}
          className="border-blue-300 focus:border-blue-500"
        />
        <Input
          name="date"
          type="date"
          value={newMeeting.date}
          onChange={handleInputChange}
          className="border-blue-300 focus:border-blue-500"
        />
      </div>

      <Button onClick={addMeeting} className="mb-6 bg-blue-600 hover:bg-blue-700 text-white">
        <PlusIcon className="mr-2 h-4 w-4" /> Schedule New Meeting
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-700">{meeting.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                <strong>Date:</strong> {meeting.date}
              </p>
              <Button 
                onClick={() => joinMeeting(meeting.id)} 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <VideoIcon className="mr-2 h-4 w-4" /> Join Meeting
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}