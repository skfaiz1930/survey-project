"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, DownloadIcon, EyeIcon, MoreHorizontalIcon, Share2Icon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import SurveyScorecard from "@/components/pulse-survey/survey-scorecard"

// Mock data for completed surveys
const mockCompletedSurveys = [
  {
    id: "3",
    title: "Q1 Team Pulse Check",
    startDate: new Date(2023, 1, 1),
    endDate: new Date(2023, 1, 15),
    responseRate: 92,
    teamMembers: 25,
    responses: 23,
    averageScore: 4.1,
    subthemeScores: {
      communication: 4.3,
      collaboration: 4.5,
      leadership: 3.8,
      worklife: 3.9,
      growth: 4.0,
    },
    sentimentAnalysis: {
      positive: 65,
      neutral: 25,
      negative: 10,
    },
  },
  {
    id: "4",
    title: "Remote Work Satisfaction",
    startDate: new Date(2023, 0, 10),
    endDate: new Date(2023, 0, 25),
    responseRate: 84,
    teamMembers: 25,
    responses: 21,
    averageScore: 3.7,
    subthemeScores: {
      communication: 3.5,
      collaboration: 3.2,
      leadership: 4.0,
      worklife: 4.2,
      growth: 3.6,
    },
    sentimentAnalysis: {
      positive: 55,
      neutral: 30,
      negative: 15,
    },
  },
]

export default function CompletedSurveys() {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null)

  const handleViewScorecard = (surveyId: string) => {
    setSelectedSurvey(surveyId)
  }

  const handleBackToList = () => {
    setSelectedSurvey(null)
  }

  if (selectedSurvey) {
    const survey = mockCompletedSurveys.find((s) => s.id === selectedSurvey)

    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={handleBackToList} className="mb-4">
          Back to Completed Surveys
        </Button>
        {survey ? <SurveyScorecard survey={survey} /> : <div>Survey not found</div>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {mockCompletedSurveys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCompletedSurveys.map((survey) => (
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
                      <DropdownMenuItem onClick={() => handleViewScorecard(survey.id)}>
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View Scorecard
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2Icon className="h-4 w-4 mr-2" />
                        Share Results
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs font-normal">
                    {format(survey.startDate, "MMM d")} - {format(survey.endDate, "MMM d, yyyy")}
                  </Badge>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-sm text-gray-500">Response Rate</p>
                      <p className="font-medium text-lg">{survey.responseRate}%</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-sm text-gray-500">Responses</p>
                      <p className="font-medium text-lg">{survey.responses}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-sm text-gray-500">Avg. Score</p>
                      <p className="font-medium text-lg">{survey.averageScore}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-1 h-4">
                    {Object.entries(survey.subthemeScores).map(([key, score]) => (
                      <div
                        key={key}
                        className="h-full rounded-sm"
                        style={{
                          backgroundColor: score >= 4 ? "#6EE7B7" : score >= 3 ? "#93C5FD" : "#FCA5A5",
                          opacity: 0.7 + score / 10,
                        }}
                        title={`${key}: ${score}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  className="w-full bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
                  onClick={() => handleViewScorecard(survey.id)}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  View Scorecard
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <p className="text-gray-500">No completed surveys found.</p>
          <p className="text-sm text-gray-400 mt-1">Completed surveys will appear here.</p>
        </div>
      )}
    </div>
  )
}
