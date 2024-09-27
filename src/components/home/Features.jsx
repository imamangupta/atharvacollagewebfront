'use client'

import { motion } from 'framer-motion'
import { Calendar, CheckSquare, DollarSign, Users } from 'lucide-react'

const features = [
  {
    icon: Calendar,
    title: 'Smart Event Planning',
    description: 'Intuitive tools for seamless event creation and management. Collaborate in real-time with your team.'
  },
  {
    icon: CheckSquare,
    title: 'Task Automation',
    description: 'Automate task assignments, set smart reminders, and track progress with our AI-powered system.'
  },
  {
    icon: DollarSign,
    title: 'Budget Optimization',
    description: 'Intelligent budget tracking and cost-saving recommendations to maximize your events value.'
  },
  {
    icon: Users,
    title: 'Vendor Marketplace',
    description: 'Access our curated network of top-rated vendors and manage all communications in one place.'
  }
]

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Revolutionize Your Event Planning
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}