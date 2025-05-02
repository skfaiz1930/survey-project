"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, BarChartIcon, EyeIcon, MoreHorizontalIcon, SendIcon, UsersIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import SurveyResponseDashboard from "@/components/pulse-survey/survey-response-dashboard"

// Mock data for active surveys
const mockActiveSurveys = [
  {
    id: "1",
    title: "Q2 Team Pulse Check",
    startDate: new Date(2023, 4, 15),
    endDate: new Date(2023, 4, 30),
    responseRate: 68,
    teamMembers: 25,
    responses: 17,
    averageScore: 3.8,
  },
  {
    id: "2",
    title: "Leadership Effectiveness Survey",
    startDate: new Date(2023, 4, 10),
    endDate: new Date(2023, 4, 25),
    responseRate: 42,
    teamMembers: 12,
    responses: 5,
    averageScore: 4.2,
  },
]

export default function ActiveSurveys() {
  const [loading, setLoading] = useState(false)
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null)

  const handleViewResponses = (surveyId: string) => {
    setSelectedSurvey(surveyId)
  }

  const handleBackToList = () => {
    setSelectedSurvey(null)
  }

  if (selectedSurvey) {
    const survey = mockActiveSurveys.find((s) => s.id === selectedSurvey)

    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={handleBackToList} className="mb-4">
          Back to Active Surveys
        </Button>
        {survey ? <SurveyResponseDashboard survey={survey} /> : <div>Survey not found</div>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ) : mockActiveSurveys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockActiveSurveys.map((survey) => (
            <Card key={survey.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{survey.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewResponses(survey.id)}>
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View Responses
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SendIcon className="h-4 w-4 mr-2" />
                        Send Reminder
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs font-normal">
                    {format(survey.startDate, "MMM d")} - {format(survey.endDate, "MMM d, yyyy")}
                  </Badge>
                  <Badge className="bg-[#60A5FA] hover:bg-[#3B82F6]">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Response Rate</span>
                      <span className="text-sm font-medium">{survey.responseRate}%</span>
                    </div>
                    <Progress value={survey.responseRate} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Team Members</p>
                        <p className="font-medium">{survey.teamMembers}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChartIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Responses</p>
                        <p className="font-medium">{survey.responses}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  className="w-full bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
                  onClick={() => handleViewResponses(survey.id)}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  View Dashboard
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <p className="text-gray-500">No active surveys found.</p>
          <p className="text-sm text-gray-400 mt-1">Create a new survey to get started.</p>
        </div>
      )}
    </div>
  )
}
