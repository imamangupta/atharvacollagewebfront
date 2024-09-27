'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export function Messaging() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey team, how's the event planning going?", sender: "John" },
    { id: 2, text: "Great! We've finalized the venue.", sender: "Sarah" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "You" }])
      setNewMessage("")
    }
  }

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Team Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-md mb-4 p-4 overflow-y-auto">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`mb-2 p-2 rounded ${
                    message.sender === "You" ? "bg-blue-100 ml-auto" : "bg-gray-200"
                  }`}
                  style={{ maxWidth: "70%" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="font-semibold">{message.sender}</p>
                  <p>{message.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex space-x-2">
            <Input 
              placeholder="Type your message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}