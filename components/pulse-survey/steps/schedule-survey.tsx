"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScheduleSurveyProps {
  startDate: Date | null
  endDate: Date | null
  reminderFrequency: string
  updateData: (data: { startDate: Date | null; endDate: Date | null; reminderFrequency: string }) => void
}

export default function ScheduleSurvey({ startDate, endDate, reminderFrequency, updateData }: ScheduleSurveyProps) {
  const [dateError, setDateError] = useState<string | null>(null)

  const handleStartDateChange = (date: Date | undefined) => {
    const newStartDate = date || null

    // Validate that start date is before end date if end date exists
    if (newStartDate && endDate && newStartDate > endDate) {
      setDateError("Start date must be before end date")
    } else {
      setDateError(null)
      updateData({ startDate: newStartDate, endDate, reminderFrequency })
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    const newEndDate = date || null

    // Validate that end date is after start date if start date exists
    if (newEndDate && startDate && newEndDate < startDate) {
      setDateError("End date must be after start date")
    } else {
      setDateError(null)
      updateData({ startDate, endDate: newEndDate, reminderFrequency })
    }
  }

  const reminderOptions = [
    { value: "daily", label: "Daily" },
    { value: "2days", label: "Every 2 days" },
    { value: "3days", label: "Every 3 days" },
    { value: "weekly", label: "Weekly" },
    { value: "none", label: "No reminders" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[#1F2937] mb-2">Schedule Survey</h3>
        <p className="text-sm text-gray-500 mb-4">
          Set the start and end dates for your survey and configure reminder settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="start-date"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate || undefined} onSelect={handleStartDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="end-date"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Select end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate || undefined} onSelect={handleEndDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {dateError && <div className="text-sm text-red-500">{dateError}</div>}

      <div className="space-y-2 pt-4">
        <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
        <Select
          value={reminderFrequency}
          onValueChange={(value) => updateData({ startDate, endDate, reminderFrequency: value })}
        >
          <SelectTrigger id="reminder-frequency">
            <SelectValue placeholder="Select reminder frequency" />
          </SelectTrigger>
          <SelectContent>
            {reminderOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Reminders will be sent via your selected delivery systems to team members who haven't completed the survey.
        </p>
      </div>

      <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-4 mt-6">
        <h4 className="text-sm font-medium text-[#0369A1] mb-2">Reminder Schedule Preview</h4>
        <div className="text-sm text-[#0369A1]">
          {startDate && endDate ? (
            <>
              <p>
                Survey period: {format(startDate, "PPP")} to {format(endDate, "PPP")}
              </p>
              <p className="mt-1">
                {reminderFrequency === "none"
                  ? "No reminders will be sent."
                  : reminderFrequency === "daily"
                    ? "Reminders will be sent daily to team members who haven't responded."
                    : reminderFrequency === "2days"
                      ? "Reminders will be sent every 2 days to team members who haven't responded."
                      : reminderFrequency === "3days"
                        ? "Reminders will be sent every 3 days to team members who haven't responded."
                        : "Reminders will be sent weekly to team members who haven't responded."}
              </p>
            </>
          ) : (
            <p>Please select both start and end dates to see the reminder schedule.</p>
          )}
        </div>
      </div>
    </div>
  )
}
