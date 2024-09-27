'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Calendar, CheckSquare, DollarSign, Users, MessageSquare, ChevronLeft, ChevronRight, Video } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  const router = useRouter()
  const menuItems = [
    { icon: Home, label: 'Overview', id: 'overview' },
    { icon: Calendar, label: 'Events', id: 'event' },
    { icon: CheckSquare, label: 'Tasks', id: 'tasks' },
    { icon: DollarSign, label: 'Budget User', id: 'budgetuser' },
    { icon: DollarSign, label: 'Budget Admin', id: 'budgetadmin' },
    { icon: Users, label: 'Vendors', id: 'vendors' },
    { icon: MessageSquare, label: 'Messages', id: 'messages' },
    { icon: Video, label: 'Video Call', id: 'videocall' },
  ]


  const logout =()=>{
    localStorage.clear()
    router.push("/")
  }

  return (
    <motion.aside 
      className={`bg-indigo-900 text-white h-screen p-4 fixed left-0 top-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-10">
        <Link href="/" className={`flex items-center space-x-2 ${isSidebarOpen ? '' : 'justify-center'}`}>
          <Home size={28} className="text-indigo-300" />
          {isSidebarOpen && <span className="text-2xl font-bold">PlanKaro</span>}
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-indigo-300 hover:text-white"
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </Button>
      </div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
              activeTab === item.id ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-indigo-800'
            }`}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon size={20} />
            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
          </motion.button>
        ))}
        <div>
            <Button onClick={logout} className="w-full">LogOut</Button>
        </div>
      </nav>
    </motion.aside>
  )
}