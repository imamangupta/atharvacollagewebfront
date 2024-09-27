"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Star,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Search,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// Dummy data for vendors
const initialVendors = [
  {
    id: 1,
    name: "Floral Delights",
    type: "Decoration",
    phone: "9876543210",
    email: "floral@example.com",
    location: "Mumbai",
    status: "Available",
    rating: 4.5,
    description:
      "Specializing in elegant floral arrangements for all occasions.",
    image: "https://source.unsplash.com/random/200x200?sig=1",
    totalBookings: 50,
    upcomingEvents: 3,
  },
  {
    id: 2,
    name: "Tasty Bites Catering",
    type: "Caterer",
    phone: "8765432109",
    email: "tasty@example.com",
    location: "Delhi",
    status: "Not Available",
    rating: 4.8,
    description: "Gourmet catering services for events of all sizes.",
    image: "https://source.unsplash.com/random/200x200?sig=2",
    totalBookings: 75,
    upcomingEvents: 5,
  },
  {
    id: 3,
    name: "Groove Masters",
    type: "DJ",
    phone: "7654321098",
    email: "groove@example.com",
    location: "Bangalore",
    status: "Available",
    rating: 4.2,
    description: "Professional DJs to keep your party rocking all night long.",
    image: "https://source.unsplash.com/random/200x200?sig=3",
    totalBookings: 100,
    upcomingEvents: 8,
  },
  {
    id: 4,
    name: "Elegant Events",
    type: "Event Planner",
    phone: "6543210987",
    email: "elegant@example.com",
    location: "Chennai",
    status: "Available",
    rating: 4.7,
    description: "Full-service event planning for memorable occasions.",
    image: "https://source.unsplash.com/random/200x200?sig=4",
    totalBookings: 60,
    upcomingEvents: 4,
  },
  {
    id: 5,
    name: "Snap Perfect",
    type: "Photographer",
    phone: "5432109876",
    email: "snap@example.com",
    location: "Kolkata",
    status: "Not Available",
    rating: 4.6,
    description: "Capturing your special moments with artistic flair.",
    image: "https://source.unsplash.com/random/200x200?sig=5",
    totalBookings: 80,
    upcomingEvents: 2,
  },
];

export default function VendorDirectory() {
  const [vendors, setVendors] = useState(initialVendors);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const vendorsPerPage = 5;

  useEffect(() => {
    // Simulating API call
    const fetchVendors = async () => {
      // In a real app, you'd fetch data from an API here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setVendors(initialVendors);
    };
    fetchVendors();
  }, []);

  const addVendor = (newVendor) => {
    setVendors([
      ...vendors,
      {
        ...newVendor,
        id: vendors.length + 1,
        rating: 0,
        totalBookings: 0,
        upcomingEvents: 0,
      },
    ]);
  };

  const submitFeedback = (vendorId, ratings, feedback) => {
    // In a real app, you'd send this to a backend
    console.log(`Feedback for vendor ${vendorId}:`, ratings, feedback);
    // Update the vendor's rating (in a real app, this would be done on the server)
    const averageRating =
      Object.values(ratings).reduce((a, b) => a + b) /
      Object.values(ratings).length;
    setVendors(
      vendors.map((v) =>
        v.id === vendorId ? { ...v, rating: (v.rating + averageRating) / 2 } : v
      )
    );
  };

  const filteredVendors = useMemo(() => {
    return vendors
      .filter(
        (v) =>
          v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((v) => (filterType ? v.type === filterType : true))
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [vendors, searchTerm, filterType, sortBy, sortOrder]);

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const leaderboardByField = useMemo(() => {
    const fields = [...new Set(vendors.map((v) => v.type))];
    return fields.reduce((acc, field) => {
      const fieldVendors = vendors
        .filter((v) => v.type === field)
        .sort((a, b) => b.rating - a.rating);
      acc[field] = fieldVendors;
      return acc;
    }, {});
  }, [vendors]);

  function AddVendorForm({ onSubmit }) {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      location: "",
      type: "",
      status: "Available",
      description: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Vendor Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        <Select
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="SelectType" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DJ">DJ</SelectItem>
            <SelectItem value="Caterer">Caterer</SelectItem>
            <SelectItem value="Decoration">Decoration</SelectItem>
            <SelectItem value="Event Planner">Event Planner</SelectItem>
            <SelectItem value="Photographer">Photographer</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Not Available">Not Available</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Button type="submit" className="w-full">
          Add Vendor
        </Button>
      </form>
    );
  }

  function FeedbackForm({ vendors, onSubmit }) {
    const [selectedVendor, setSelectedVendor] = useState("");
    const [ratings, setRatings] = useState({
      quality: 0,
      punctuality: 0,
      professionalism: 0,
      communication: 0,
      value: 0,
    });
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(parseInt(selectedVendor), ratings, feedback);
      // Reset form
      setSelectedVendor("");
      setRatings({
        quality: 0,
        punctuality: 0,
        professionalism: 0,
        communication: 0,
        value: 0,
      });
      setFeedback("");
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select value={selectedVendor} onValueChange={setSelectedVendor}>
          <SelectTrigger>
            <SelectValue placeholder="Select Vendor" />
          </SelectTrigger>
          <SelectContent>
            {vendors.map((vendor) => (
              <SelectItem key={vendor.id} value={vendor.id.toString()}>
                {vendor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {Object.entries(ratings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${
                    star <= value ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRatings({ ...ratings, [key]: star })}
                />
              ))}
            </div>
          </div>
        ))}
        <Input
          placeholder="Additional Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    );
  }

  function Leaderboard({ vendors }) {
    const sortedVendors = [...vendors].sort((a, b) => b.rating - a.rating);

    return (
      <div>
        <ul>
          {sortedVendors.map((vendor, index) => (
            <motion.li
              key={vendor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex items-center">
                <span className="font-bold mr-2">{index + 1}.</span>
                <Avatar className="mr-2">
                  <AvatarImage src={vendor.image} alt={vendor.name} />
                  <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-medium">{vendor.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({vendor.type})
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="text-yellow-400 w-4 h-4 mr-1" />
                <span>{vendor.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({vendor.totalBookings} bookings)
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-4"
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 md:mb-0">
            Vendor Management
          </h1>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Add Vendor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vendor</DialogTitle>
                </DialogHeader>
                <AddVendorForm onSubmit={addVendor} />
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={() => setVendors(initialVendors)}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 flex flex-col md:flex-row gap-2"
        >
          <div className="relative flex-grow">
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DJ">DJ</SelectItem>
              <SelectItem value="Caterer">Caterer</SelectItem>
              <SelectItem value="Decoration">Decoration</SelectItem>
              <SelectItem value="Event Planner">Event Planner</SelectItem>
              <SelectItem value="Photographer">Photographer</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <AnimatePresence>
          <motion.div
            key={currentPage + searchTerm + filterType + sortBy + sortOrder}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Avatar</TableHead>
                  <TableHead>
                    <button
                      onClick={() => {
                        if (sortBy === "name") {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy("name");
                          setSortOrder("asc");
                        }
                      }}
                      className="flex items-center"
                    >
                      Name
                      {sortBy === "name" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1" />
                        ) : (
                          <ChevronDown className="ml-1" />
                        ))}
                    </button>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <button
                      onClick={() => {
                        if (sortBy === "rating") {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy("rating");
                          setSortOrder("desc");
                        }
                      }}
                      className="flex items-center"
                    >
                      Rating
                      {sortBy === "rating" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1" />
                        ) : (
                          <ChevronDown className="ml-1" />
                        ))}
                    </button>
                  </TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={vendor.image} alt={vendor.name} />
                        <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vendor.status === "Available"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 w-4 h-4 mr-1" />
                        <span>{vendor.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{vendor.totalBookings}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total Bookings: {vendor.totalBookings}</p>
                            <p>Upcoming Events: {vendor.upcomingEvents}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={`vendor-${vendor.id}`}>
                            <AccordionTrigger>View Details</AccordionTrigger>
                            <AccordionContent>
                              <div className="p-4 bg-gray-50 rounded-md">
                                <p>
                                  <Phone className="inline mr-2" />
                                  {vendor.phone}
                                </p>
                                <p>
                                  <Mail className="inline mr-2" />
                                  {vendor.email}
                                </p>
                                <p>
                                  <MapPin className="inline mr-2" />
                                  {vendor.location}
                                </p>
                                <p className="mt-2">{vendor.description}</p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" /> Chat
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredVendors.length / vendorsPerPage) },
            (_, i) => (
              <Button
                key={i}
                onClick={() => paginate(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="mx-1"
              >
                {i + 1}
              </Button>
            )
          )}
        </div>

        <Tabs defaultValue="feedback" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feedback">Give Feedback</TabsTrigger>
            <TabsTrigger value="globalLeaderboard">
              Global Leaderboard
            </TabsTrigger>
            <TabsTrigger value="fieldLeaderboards">
              Field Leaderboards
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <FeedbackForm vendors={vendors} onSubmit={submitFeedback} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="globalLeaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Global Vendor Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Leaderboard vendors={vendors} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="fieldLeaderboards">
            <Card>
              <CardHeader>
                <CardTitle>Field-specific Leaderboards</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={Object.keys(leaderboardByField)[0]}>
                  <TabsList>
                    {Object.keys(leaderboardByField).map((field) => (
                      <TabsTrigger key={field} value={field}>
                        {field}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(leaderboardByField).map(
                    ([field, fieldVendors]) => (
                      <TabsContent key={field} value={field}>
                        <Leaderboard vendors={fieldVendors} />
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
