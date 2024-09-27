'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { EventOverview } from '@/components/dashboard/EventOverview'
import { TaskManager } from '@/components/dashboard/TaskManager'
import { BudgetTracker } from '@/components/dashboard/BudgetTracker'
import { VendorDirectory } from '@/components/dashboard/VendorDirectory'
import { Messaging } from '@/components/dashboard/Messaging'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <EventOverview />
      case 'tasks':
        return <TaskManager />
      case 'budget':
        return <BudgetTracker />
      case 'vendors':
        return <VendorDirectory />
      case 'messages':
        return <Messaging />
      case 'videocall':
        return <Messaging />
      default:
        return <EventOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}