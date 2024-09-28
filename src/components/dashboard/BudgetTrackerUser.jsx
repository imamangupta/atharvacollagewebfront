'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux';
import { BaseApiUrl } from '@/utils/constants'

// Dummy database
const initialBills = [
  { id: 1, username: 'Rahul Sharma', title: 'Office Supplies', amount: 15000, status: 'pending', description: 'Purchased pens, notebooks, and staplers', billPhoto: '/placeholder.svg?height=100&width=100', productPhoto: '/placeholder.svg?height=100&width=100', category: 'Stationery', date: '2023-09-15' },
  { id: 2, username: 'Priya Patel', title: 'Team Lunch', amount: 20000, status: 'approved', description: 'Monthly team lunch at local restaurant', billPhoto: '/placeholder.svg?height=100&width=100', productPhoto: '/placeholder.svg?height=100&width=100', category: 'Food', date: '2023-09-20' },
]

const categories = ['Stationery', 'Food', 'Software', 'Travel', 'Miscellaneous']

export default function BudgetTrackerUser() {

  const dataquesiton = useSelector((store) => store.eventid);
  const usermydata = useSelector((store) => store.userdata);
  console.log(usermydata);
  

  const [budget, setBudget] = useState(1000000) // 10 Lakh INR
  const [spent, setSpent] = useState(600000)
  const [bills, setBills] = useState(initialBills)
  const [isAddingBill, setIsAddingBill] = useState(false)
  const [newBill, setNewBill] = useState({ title: '', amount: '', description: '', category: '', date: '' })
  const [billPhoto, setBillPhoto] = useState(null)
  const [productPhoto, setProductPhoto] = useState(null)
  const [activeTab, setActiveTab] = useState('myBills')
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [currentPhotoType, setCurrentPhotoType] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const currentUser = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    avatar: '/placeholder.svg?height=100&width=100',
    userid:usermydata?.id
  }

  useEffect(() => {
    // This would be an API call in a real application
    setBills(initialBills)
  }, [])

  const addNewBill = async () => {


    console.log('asdfkjaldsf workingldsakfj');




    // e.preventDefault()
    // In a real app, you'd send this to a server

    const billToAdd = {
      ...newBill,
      id: bills.length + 1,
      username: currentUser.name,
      amount: parseFloat(newBill.amount),
      status: 'pending',
      billPhoto: billPhoto || 'https://via.placeholder.com/100?text=Bill+Photo',
      productPhoto: productPhoto || 'https://via.placeholder.com/100?text=Product+Photo'
    }
    console.log(billToAdd);

     const data = new FormData();

      data.append("file", billPhoto);
      data.append("upload_preset", "kfdvzoaz");
      data.append("cloud_name", "dggd6cvzh");
      // CLOUDINARY_URL=cloudinary://383736856582798:VATPzuynv5I_0lkdHMdnrYNakYk@dggd6cvzh


      if (billPhoto === null) {
        return console.log('work..');
      }

      const res = await fetch('https://api.cloudinary.com/v1_1/dggd6cvzh/image/upload', {
        method: "POST",
        body: data
      })
      const cloudData = await res.json();

     const data2 = new FormData();

      data2.append("file", productPhoto);
      data2.append("upload_preset", "kfdvzoaz");
      data2.append("cloud_name", "dggd6cvzh");
      // CLOUDINARY_URL=cloudinary://383736856582798:VATPzuynv5I_0lkdHMdnrYNakYk@dggd6cvzh


      if (productPhoto === null) {
        return console.log('work..');
      }

      const res2 = await fetch('https://api.cloudinary.com/v1_1/dggd6cvzh/image/upload', {
        method: "POST",
        body: data
      })
      const cloudData2 = await res2.json();




    const response = await fetch(`${BaseApiUrl}/bill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        billtitle: newBill.title, amount: newBill.amount, category: newBill.category, whichdate: newBill.date,
        description: newBill.description, billphote: cloudData.url, productphoto: cloudData2.url, eventid: dataquesiton, userid: usermydata.id,status:'pending',username:usermydata.userName
      })
    });

    const json = await response.json();

    if (json) {

      console.log(json);
      setBills(json.data)



    }







    setBills([...bills, billToAdd])
    setIsAddingBill(false)
    setNewBill({ title: '', amount: '', description: '', category: '', date: '' })
    setBillPhoto(null)
    setProductPhoto(null)
  }

  const openCamera = async (type) => {
    setCurrentPhotoType(type)
    setIsCameraOpen(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      videoRef.current.play()
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    const photoUrl = canvas.toDataURL('image/jpeg')
    if (currentPhotoType === 'bill') {
      setBillPhoto(photoUrl)
    } else {
      setProductPhoto(photoUrl)
    }
    closeCamera()
  }
  console.log(billPhoto);
  const closeCamera = () => {
    const stream = videoRef.current.srcObject
    const tracks = stream.getTracks()
    tracks.forEach(track => track.stop())
    setIsCameraOpen(false)
    setCurrentPhotoType(null)
  }

  const myBills = bills.filter(bill => bill.userid === currentUser.userid)
  const otherBills = bills.filter(bill => bill)


  const fetchmybill = async()=>{
    const response = await fetch(`${BaseApiUrl}/bill`, {
      method: 'GET',
      headers: {
        'eventid': dataquesiton
      },
    })
    const json = await response.json()

    if (json.data) {
     console.log(json);
     setBills(json.data)
     
    }
  }

  useEffect(() => {
    fetchmybill()
  }, [])
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto bg-white"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">User Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-indigo-700">{currentUser.name}</p>
            <p className="text-sm text-indigo-500">{currentUser.email}</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mb-6 bg-white border border-indigo-100">
          <CardHeader>
            <CardTitle className="text-indigo-700">Budget Overview</CardTitle>
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

      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="myBills" className="text-indigo-700">My Bills</TabsTrigger>
            <TabsTrigger value="allBills" className="text-indigo-700">All Bills</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Button onClick={() => setIsAddingBill(true)} className="mb-4 bg-indigo-600 hover:bg-indigo-700">Add New Bill</Button>

      <AnimatePresence mode="wait">
        {activeTab === 'myBills' && (
          <motion.div
            key="myBills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white border border-indigo-100">
              <CardHeader>
                <CardTitle className="text-indigo-700">My Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-700">Name</TableHead>
                      <TableHead className="text-indigo-700">Title</TableHead>
                      <TableHead className="text-indigo-700">Amount</TableHead>
                      <TableHead className="text-indigo-700">Category</TableHead>
                      <TableHead className="text-indigo-700">Date</TableHead>
                      <TableHead className="text-indigo-700">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myBills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{bill.username}</TableCell>
                        <TableCell>{bill.billtitle}</TableCell>
                        <TableCell>₹{bill.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>{bill.category}</TableCell>
                        <TableCell>{new Date(bill.date).toLocaleDateString('en-IN')}</TableCell>
                        <TableCell>{bill.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'allBills' && (
          <motion.div
            key="allBills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white border border-indigo-100">
              <CardHeader>
                <CardTitle className="text-indigo-700">All Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-700">User</TableHead>
                      <TableHead className="text-indigo-700">Title</TableHead>
                      <TableHead className="text-indigo-700">Amount</TableHead>
                      <TableHead className="text-indigo-700">Category</TableHead>
                      <TableHead className="text-indigo-700">Date</TableHead>
                      <TableHead className="text-indigo-700">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {otherBills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{bill.username}</TableCell>
                        <TableCell>{bill.billtitle}</TableCell>
                        <TableCell>₹{bill.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>{bill.category}</TableCell>
                        <TableCell>{new Date(bill.date).toLocaleDateString('en-IN')}</TableCell>
                        <TableCell>{bill.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isAddingBill} onOpenChange={setIsAddingBill}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-indigo-700">Add New Bill</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-indigo-600">Bill Title</Label>
              <Input
                id="title"
                value={newBill.title}
                onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
                className="border-indigo-300 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-indigo-600">Amount (INR)</Label>
              <Input
                id="amount"
                type="number"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                className="border-indigo-300 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-indigo-600">Category</Label>
              <Select value={newBill.category} onValueChange={(value) => setNewBill({ ...newBill, category: value })}>
                <SelectTrigger className="border-indigo-300 focus:border-indigo-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-indigo-600">Date</Label>
              <Input
                id="date"
                type="date"
                value={newBill.date}
                onChange={(e) => setNewBill({ ...newBill, date: e.target.value })}
                className="border-indigo-300 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-indigo-600">Description</Label>
              <Textarea
                id="description"
                value={newBill.description}
                onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
                className="border-indigo-300 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={() => openCamera('bill')} className="bg-blue-600 hover:bg-blue-700">
                {billPhoto ? 'Retake Bill Photo' : 'Take Bill Photo'}
              </Button>
              <Button onClick={() => openCamera('product')} className="bg-blue-600 hover:bg-blue-700">
                {productPhoto ? 'Retake Product Photo' : 'Take Product Photo'}
              </Button>
            </div>
            {(billPhoto || productPhoto) && (
              <div className="flex justify-between">
                {billPhoto && <img src={billPhoto} alt="Bill" className="w-1/2 h-auto" />}
                {productPhoto && <img src={productPhoto} alt="Product" className="w-1/2 h-auto" />}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={addNewBill} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Submit Bill</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCameraOpen} onOpenChange={closeCamera}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-indigo-700">Take Photo</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <video ref={videoRef} className="w-full h-auto" />
            <Button onClick={capturePhoto} className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700">
              Capture Photo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  )
}