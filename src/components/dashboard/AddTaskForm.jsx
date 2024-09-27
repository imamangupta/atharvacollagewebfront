'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

const AddTaskForm = ({ onClose, onAddTask, users }) => {
  const [task, setTask] = useState({
    name: '',
    assignedTo: '',
    description: '',
    budget: '',
    status: 'pending',
    priority: 'medium',
    dueDate: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTask(task)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select
              value={task.assignedTo}
              onValueChange={(value) => setTask({ ...task, assignedTo: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={5}>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.name}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              type="number"
              value={task.budget}
              onChange={(e) => setTask({ ...task, budget: Number(e.target.value) })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label>Status</Label>
            <RadioGroup
              value={task.status}
              onValueChange={(value) => setTask({ ...task, status: value })}
              className="flex space-x-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-progress" id="in-progress" />
                <Label htmlFor="in-progress">In Progress</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="completed" />
                <Label htmlFor="completed">Completed</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Priority</Label>
            <Select
              value={task.priority}
              onValueChange={(value) => setTask({ ...task, priority: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={5}>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                  {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={task.dueDate ? new Date(task.dueDate) : undefined}
                  onSelect={(date) => setTask({ ...task, dueDate: date?.toISOString() })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">Add Task</Button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default AddTaskForm