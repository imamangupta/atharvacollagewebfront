'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export function BudgetTracker() {
  const budget = 10000
  const spent = 6000

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Budget Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold">${budget}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Spent</p>
                <p className="text-2xl font-bold">${spent}</p>
              </div>
            </div>
            <Progress value={(spent / budget) * 100} />
            <p className="text-sm text-gray-500 text-center">
              ${budget - spent} remaining
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}