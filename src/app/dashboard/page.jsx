'use client'

import {  useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { EventOverview } from '@/components/dashboard/EventOverview'
import { TaskManager } from '@/components/dashboard/TaskManager'
// import { BudgetTrackerUser } from '@/components/dashboard/BudgetTrackerUser'
// import {  } from '@/components/dashboard/VendorDirectory'
import { Messaging } from '@/components/dashboard/Messaging'
import BudgetTrackerUser from '@/components/dashboard/BudgetTrackerUser'
import BudgetTrackerAdmin from '@/components/dashboard/BudgetTrackerAdmin'
import { BaseApiUrl } from '@/utils/constants'
import VendorDirectory from '@/components/dashboard/VendorDirectory'
// import { BudgetTrackerAdmin } from '@/components/dashboard/BudgetTrackerAdmin'
import { useSearchParams } from "next/navigation";
// import EventPerticular from '@/components/dashboard/EventPerticular'
import Gallery from '@/components/dashboard/Gallery'

import { useDispatch } from 'react-redux'
import { addUser } from '@/app/redux/slice'
// import VideoRoom from '@/components/dashboard/Interview'
import VideoCall from '@/components/dashboard/VideoCall'
import EventDetails from '@/components/dashboard/EventDetails'

export default function Dashboard() {
  // const searchParams = useSearchParams();
  // const nav = searchParams.get('nav');
  const dispatch = useDispatch();



  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userData, setUserData] = useState([])




  const userEventData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (json.user) {
      console.log(json);
      setUserData(json?.user)
      dispatch(addUser(json?.user))

    }

  }


  useEffect(() => {
    userEventData()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <EventOverview  />
      case 'tasks':
        return <TaskManager />
      case 'event':
        return <EventDetails />
      case 'budgetuser':
        return <BudgetTrackerUser />
      case 'budgetadmin':
        return <BudgetTrackerAdmin />
      case 'vendors':
        return <VendorDirectory />
      case 'messages':
        return <Messaging />
      case 'videocall':
        return <VideoCall />
      case 'gallery':
        return <Gallery />
      default:
        return <EventOverview userdata={userData} />
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