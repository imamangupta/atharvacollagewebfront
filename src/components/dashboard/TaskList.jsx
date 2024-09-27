'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Circle, Clock, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const TaskList = ({ tasks }) => {
  const [expandedTask, setExpandedTask] = useState(null)

  const toggleTask = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" />
      case 'in-progress':
        return <Clock className="text-yellow-500" />
      default:
        return <Circle className="text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-600">Status</TableHead>
            <TableHead className="font-semibold text-gray-600">Task Name</TableHead>
            <TableHead className="font-semibold text-gray-600">Assigned To</TableHead>
            <TableHead className="font-semibold text-gray-600">Due Date</TableHead>
            <TableHead className="font-semibold text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <motion.tr
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(task.status)}>
                      {getStatusIcon(task.status)}
                      <span className="ml-2 capitalize">{task.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => toggleTask(task.id)}>
                            {expandedTask === task.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{expandedTask === task.id ? 'Hide Details' : 'Show Details'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </motion.tr>
                <AnimatePresence>
                  {expandedTask === task.id && (
                    <motion.tr
                      key={`${task.id}-details`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell colSpan={5}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 bg-gray-50 rounded-lg shadow-inner"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Description:</h4>
                              <p className="text-gray-600">{task.description}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Details:</h4>
                              <ul className="space-y-1 text-gray-600">
                                <li><strong>Budget:</strong> ${task.budget}</li>
                                <li><strong>Priority:</strong> {task.priority}</li>
                                <li><strong>Status:</strong> {task.status}</li>
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50">
                              <MessageCircle className="mr-2 h-4 w-4" /> Chat with {task.assignedTo}
                            </Button>
                          </div>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  )
}

export default TaskList