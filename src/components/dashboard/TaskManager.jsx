"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import TaskFilter from "./TaskFilter";
import { useSelector } from "react-redux";
import { BaseApiUrl } from "@/utils/constants";
import { toast } from "react-hot-toast";

export function TaskManager() {
  const dataquesiton = useSelector((store) => store.eventid);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ status: "all", assignedTo: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userdata, setuserdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tasksPerPage = 5;

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/task`, {
        method: "GET",
        headers: {
          eventid: dataquesiton,
        },
      });
      const json = await response.json();
      if (json.data) {
        const filteredTasks = json.data.filter(
          (task) =>
            (task.taskname.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.assignedto.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filters.status === "all" || task.status === filters.status) &&
            (filters.assignedTo === "all" || task.assignedto === filters.assignedTo)
        );

        setTotalPages(Math.ceil(filteredTasks.length / tasksPerPage));

        const startIndex = (currentPage - 1) * tasksPerPage;
        const endIndex = startIndex + tasksPerPage;
        setTasks(filteredTasks.slice(startIndex, endIndex));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  }, [dataquesiton, currentPage, searchTerm, filters]);

  const fetchAllData = useCallback(async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/event/all`, {
        method: "GET",
        headers: {
          eventid: dataquesiton,
        },
      });
      const json = await response.json();
      if (json) {
        setuserdata(json.newdata);
      }
    } catch (error) {
      console.error("Error fetching all data:", error);
      toast.error("Failed to fetch user data");
    }
  }, [dataquesiton]);

  useEffect(() => {
    fetchTasks();
    fetchAllData();
  }, [fetchTasks, fetchAllData]);

  const handleAddTask = async (newTask) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BaseApiUrl}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskname: newTask.name,
          assignedto: newTask.assignedTo,
          Description: newTask.description,
          budget: newTask.budget,
          status: newTask.status,
          priority: newTask.priority,
          duedate: newTask.dueDate,
          eventid: dataquesiton,
        }),
      });
      const json = await response.json();

      if (json.data) {
        toast.success("Task added successfully");
        await fetchTasks(); // Refresh tasks after adding a new one
        setShowAddForm(false);
      } else {
        toast.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 space-y-4"
    >
      <div className="h-full flex-col">
        <div className="lg:col-span-2">
          <Card className="w-full overflow-hidden bg-white shadow-lg">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 bg-gray-50 border-b border-gray-200 p-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Task Manager
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Add New Task
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-600 border-gray-300 hover:bg-gray-100"
                >
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
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TaskFilter
                        filters={filters}
                        setFilters={setFilters}
                        users={userdata}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <TaskList tasks={tasks} />
              <div className="mt-4 flex justify-center items-center space-x-2">
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-72 bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <AddTaskForm
                onClose={() => setShowAddForm(false)}
                onAddTask={handleAddTask}
                users={userdata}
                isLoading={isLoading}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}