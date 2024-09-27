'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

// Dummy database
const initialBills = [
  { id: 1, username: 'Rahul Sharma', title: 'Office Supplies', amount: 15000, status: 'pending', description: 'Purchased pens, notebooks, and staplers', billPhoto: '/placeholder.svg?height=100&width=100', productPhoto: '/placeholder.svg?height=100&width=100', category: 'Stationery', date: '2023-09-15' },
  { id: 2, username: 'Priya Patel', title: 'Team Lunch', amount: 20000, status: 'pending', description: 'Monthly team lunch at local restaurant', billPhoto: '/placeholder.svg?height=100&width=100', productPhoto: '/placeholder.svg?height=100&width=100', category: 'Food', date: '2023-09-20' },
  { id: 3, username: 'Amit Singh', title: 'Software License', amount: 50000, status: 'approved', description: 'Annual subscription for project management software', billPhoto: '/placeholder.svg?height=100&width=100', productPhoto: '/placeholder.svg?height=100&width=100', category: 'Software', date: '2023-09-10' },
]

const categories = ['Stationery', 'Food', 'Software', 'Travel', 'Miscellaneous']

export default function BudgetTrackerAdmin() {
  const [budget, setBudget] = useState(1000000) // 10 Lakh INR
  const [spent, setSpent] = useState(600000)
  const [bills, setBills] = useState(initialBills)
  const [selectedBill, setSelectedBill] = useState(null)
  const [filterCategory, setFilterCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [isEditingBudget, setIsEditingBudget] = useState(false)
  const [newBudget, setNewBudget] = useState(budget)

  useEffect(() => {
    // This would be an API call in a real application
    setBills(initialBills)
  }, [])

  const approveBill = (id) => {
    setBills(prevBills => prevBills.map(bill => 
      bill.id === id ? { ...bill, status: 'approved' } : bill
    ))
    const approvedBill = bills.find(bill => bill.id === id)
    if (approvedBill) {
      setSpent(prevSpent => prevSpent + approvedBill.amount)
    }
  }

  const rejectBill = (id) => {
    setBills(prevBills => prevBills.map(bill => 
      bill.id === id ? { ...bill, status: 'rejected' } : bill
    ))
  }

  const viewDetails = (bill) => {
    setSelectedBill(bill)
  }

  const filteredBills = bills.filter(bill => 
    filterCategory === 'All' || bill.category === filterCategory
  ).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === 'amount') {
      return b.amount - a.amount
    }
    return 0
  })

  const categoryData = categories.map(category => ({
    name: category,
    value: bills.filter(bill => bill.category === category && bill.status === 'approved')
              .reduce((sum, bill) => sum + bill.amount, 0)
  }))

  const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#10B981']

  const updateBudget = () => {
    setBudget(newBudget)
    setIsEditingBudget(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto bg-white"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border border-indigo-100">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-indigo-700">
                Budget Overview
                <Button onClick={() => setIsEditingBudget(true)} className="bg-indigo-600 hover:bg-indigo-700">Edit Budget</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-indigo-500">Total Budget</p>
                    <p className="text-2xl font-bold text-indigo-700">₹{budget.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-indigo-500">Spent</p>
                    <p className="text-2xl font-bold text-indigo-700">₹{spent.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <Progress value={(spent / budget) * 100} className="h-2 bg-indigo-100" indicatorClassName="bg-indigo-600" />
                <p className="text-sm text-indigo-500 text-center">
                  ₹{(budget - spent).toLocaleString('en-IN')} remaining
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-700">Expense by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-white border border-indigo-100">
          <CardHeader>
            <CardTitle className="text-indigo-700">Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-indigo-700">User</TableHead>
                    <TableHead className="text-indigo-700">Title</TableHead>
                    <TableHead className="text-indigo-700">Amount</TableHead>
                    <TableHead className="text-indigo-700">Category</TableHead>
                    <TableHead className="text-indigo-700">Date</TableHead>
                    <TableHead className="text-indigo-700">Status</TableHead>
                    <TableHead className="text-indigo-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.username}</TableCell>
                      <TableCell>{bill.title}</TableCell>
                      <TableCell>₹{bill.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>{bill.category}</TableCell>
                      <TableCell>{new Date(bill.date).toLocaleDateString('en-IN')}</TableCell>
                      <TableCell>{bill.status}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => approveBill(bill.id)} 
                          disabled={bill.status !== 'pending'}
                          className="mr-2 bg-blue-600 hover:bg-blue-700"
                        >
                          Approve
                        </Button>
                        <Button 
                          onClick={() => rejectBill(bill.id)} 
                          disabled={bill.status !== 'pending'}
                          className="mr-2 bg-red-600 hover:bg-red-700"
                          variant="destructive"
                        >
                          Reject
                        </Button>
                        <Button onClick={() => viewDetails(bill)} className="bg-indigo-600 hover:bg-indigo-700">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!selectedBill} onOpenChange={() => setSelectedBill(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-indigo-700">{selectedBill?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <p><strong className="text-indigo-600">User:</strong> {selectedBill?.username}</p>
            <p><strong className="text-indigo-600">Amount:</strong> ₹{selectedBill?.amount.toLocaleString('en-IN')}</p>
            <p><strong className="text-indigo-600">Category:</strong> {selectedBill?.category}</p>
            <p><strong className="text-indigo-600">Date:</strong> {selectedBill?.date}</p>
            <p><strong className="text-indigo-600">Status:</strong> {selectedBill?.status}</p>
            <p><strong className="text-indigo-600">Description:</strong> {selectedBill?.description}</p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-indigo-600">Bill Photo:</strong></p>
              <img src={selectedBill?.billPhoto} alt="Bill" className="w-full h-auto" />
              <p><strong className="text-indigo-600">Product Photo:</strong></p>
              <img src={selectedBill?.productPhoto} alt="Product" className="w-full h-auto" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditingBudget} onOpenChange={setIsEditingBudget}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-indigo-700">Edit Budget</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newBudget" className="text-indigo-600">New Budget (INR)</Label>
              <Input 
                id="newBudget"
                type="number" 
                value={newBudget} 
                onChange={(e) => setNewBudget(Number(e.target.value))}
                className="border-indigo-300 focus:border-indigo-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={updateBudget} className="bg-indigo-600 hover:bg-indigo-700">Update Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}