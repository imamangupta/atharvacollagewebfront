'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, Clock } from 'lucide-react'
import { motion } from "framer-motion"

export function TaskManager() {
  const tasks = [
    { name: 'Book Venue', status: 'completed' },
    { name: 'Arrange Catering', status: 'in-progress' },
    { name: 'Send Invitations', status: 'pending' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Task Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <motion.li 
                key={task.name} 
                className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {task.status === 'completed' && <CheckCircle className="text-green-500" />}
                {task.status === 'in-progress' && <Clock className="text-yellow-500" />}
                {task.status === 'pending' && <Circle className="text-gray-400" />}
                <span>{task.name}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}