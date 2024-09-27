'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { motion } from "framer-motion"

export function VendorDirectory() {
  const vendors = [
    { name: 'Floral Delights', type: 'Florist', rating: 4.5 },
    { name: 'Tasty Bites Catering', type: 'Caterer', rating: 4.8 },
    { name: 'Groove Masters', type: 'DJ', rating: 4.2 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {vendors.map((vendor, index) => (
              <motion.li 
                key={vendor.name} 
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div>
                  <div className="font-semibold">{vendor.name}</div>
                  <div className="text-sm text-gray-500">{vendor.type}</div>
                </div>
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                  <Star className="text-yellow-400 w-4 h-4 mr-1" />
                  <span className="font-medium">{vendor.rating}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}