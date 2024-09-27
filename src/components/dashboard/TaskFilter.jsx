'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const TaskFilter = ({ filters, setFilters, users }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="statusFilter" className="mb-1 block">Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger id="statusFilter" className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="assignedToFilter" className="mb-1 block">Assigned To</Label>
        <Select
          value={filters.assignedTo}
          onValueChange={(value) => setFilters({ ...filters, assignedTo: value })}
        >
          <SelectTrigger id="assignedToFilter" className="w-full">
            <SelectValue placeholder="Filter by user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.name}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TaskFilter