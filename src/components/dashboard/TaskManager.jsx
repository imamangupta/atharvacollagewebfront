'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Trophy, Medal } from 'lucide-react'
import TaskList from './TaskList'
import AddTaskForm from './AddTaskForm'
import TaskFilter from './TaskFilter'

// Integrated database
const initialDatabase = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', tasksCompleted: 7, totalTasks: 10 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', tasksCompleted: 5, totalTasks: 8 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', tasksCompleted: 3, totalTasks: 5 },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', tasksCompleted: 6, totalTasks: 9 },
    { id: 5, name: 'Alex Wilson', email: 'alex@example.com', tasksCompleted: 4, totalTasks: 7 },
  ],
  tasks: [
    {
      id: 1,
      name: 'Design new landing page',
      status: 'in-progress',
      assignedTo: 'John Doe',
      description: 'Create a modern and responsive landing page for our product',
      budget: 1000,
      priority: 'high',
      dueDate: '2023-06-30T00:00:00.000Z',
    },
    {
      id: 2,
      name: 'Implement user authentication',
      status: 'pending',
      assignedTo: 'Jane Smith',
      description: 'Set up secure user authentication system using OAuth',
      budget: 1500,
      priority: 'medium',
      dueDate: '2023-07-15T00:00:00.000Z',
    },
    {
      id: 3,
      name: 'Write API documentation',
      status: 'completed',
      assignedTo: 'Mike Johnson',
      description: 'Create comprehensive documentation for our RESTful API',
      budget: 800,
      priority: 'low',
      dueDate: '2023-06-20T00:00:00.000Z',
    },
    {
      id: 4,
      name: 'Optimize database queries',
      status: 'in-progress',
      assignedTo: 'Emily Brown',
      description: 'Improve the performance of key database queries',
      budget: 1200,
      priority: 'high',
      dueDate: '2023-07-05T00:00:00.000Z',
    },
    {
      id: 5,
      name: 'Implement real-time notifications',
      status: 'pending',
      assignedTo: 'Alex Wilson',
      description: 'Add WebSocket-based real-time notifications for user actions',
      budget: 1000,
      priority: 'medium',
      dueDate: '2023-07-20T00:00:00.000Z',
    },
  ],
};

export function TaskManager() {
  const [database, setDatabase] = useState(initialDatabase)
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ status: 'all', assignedTo: 'all' })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const tasksPerPage = 5

  useEffect(() => {
    setUsers(database.users)
    updateTasks()
    updateLeaderboard()
  }, [database, currentPage, searchTerm, filters])

  const updateTasks = () => {
    let filteredTasks = database.tasks.filter(task => 
      (task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.status === 'all' || task.status === filters.status) &&
      (filters.assignedTo === 'all' || task.assignedTo === filters.assignedTo)
    )

    setTotalPages(Math.ceil(filteredTasks.length / tasksPerPage))
    
    const startIndex = (currentPage - 1) * tasksPerPage
    const endIndex = startIndex + tasksPerPage
    setTasks(filteredTasks.slice(startIndex, endIndex))
  }

  const updateLeaderboard = () => {
    const leaderboard = database.users
      .map(user => ({
        ...user,
        completionRate: (user.tasksCompleted / user.totalTasks) * 100
      }))
      .sort((a, b) => b.completionRate - a.completionRate)
      .slice(0, 5)

    setLeaderboard(leaderboard)
  }

  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: database.tasks.length + 1 }
    setDatabase(prevDB => ({
      ...prevDB,
      tasks: [taskWithId, ...prevDB.tasks]
    }))
    setShowAddForm(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 space-y-4"
    >
      <div className="h-full flex-col ">
        <div className="lg:col-span-2">
          <Card className="w-full overflow-hidden bg-white shadow-lg">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 bg-gray-50 border-b border-gray-200 p-4">
              <CardTitle className="text-2xl font-bold text-gray-800">Task Manager</CardTitle>
              <div className="flex space-x-2">
                <Button onClick={() => setShowAddForm(true)} className="bg-blue-500 text-white hover:bg-blue-600">
                  <Plus className="mr-2 h-4 w-4" /> Add New Task
                </Button>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="text-gray-600 border-gray-300 hover:bg-gray-100">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4 flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TaskFilter filters={filters} setFilters={setFilters} users={users} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <TaskList tasks={tasks} />
              <div className="mt-4 flex justify-center items-center space-x-2">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        <div>
          <Card className="w-full bg-white shadow-lg mt-10 overflow-hidden ">
            <CardHeader className="bg-gray-50 border-b border-gray-200 p-4">
              <CardTitle className="text-xl font-bold text-gray-800">Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-200">
                {leaderboard.map((user, index) => (
                  <li key={user.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-8 text-center">
                      {index === 0 && <Trophy className="h-6 w-6 text-yellow-400" />}
                      {index === 1 && <Medal className="h-6 w-6 text-gray-400" />}
                      {index === 2 && <Medal className="h-6 w-6 text-amber-600" />}
                      {index > 2 && index + 1}
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.tasksCompleted}/{user.totalTasks} tasks</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="text-sm font-medium text-blue-600">{user.completionRate.toFixed(0)}%</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>

      <AnimatePresence>
        {showAddForm && (
          <AddTaskForm onClose={() => setShowAddForm(false)} onAddTask={handleAddTask} users={users} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}