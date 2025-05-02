"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SurveyResponseDashboardProps {
  survey: any
}

export default function SurveyResponseDashboard({ survey }: SurveyResponseDashboardProps) {
  const [responseData, setResponseData] = useState<any>({
    responseRate: 0,
    responses: 0,
    teamMembers: 0,
    averageScore: 0,
    subthemeScores: {},
    questionScores: [],
    recentResponses: [],
  })

  // Simulate real-time data updates
  useEffect(() => {
    if (!survey) return

    // Initial data
    setResponseData({
      responseRate: survey.responseRate || 0,
      responses: survey.responses || 0,
      teamMembers: survey.teamMembers || 0,
      averageScore: survey.averageScore || 0,
      subthemeScores: {
        communication: 3.8,
        collaboration: 4.2,
        leadership: 3.5,
        worklife: 3.9,
        growth: 3.7,
      },
      questionScores: [
        { question: "How clear is your manager's feedback?", score: 3.6, subtheme: "communication" },
        { question: "How effective is communication within your team?", score: 4.0, subtheme: "communication" },
        { question: "Do you feel supported by your team?", score: 4.2, subtheme: "collaboration" },
        { question: "How well does your team work together on projects?", score: 4.1, subtheme: "collaboration" },
        { question: "Does your manager provide clear direction?", score: 3.5, subtheme: "leadership" },
        { question: "How well does leadership communicate company goals?", score: 3.4, subtheme: "leadership" },
        { question: "How would you rate your work-life balance?", score: 3.9, subtheme: "worklife" },
        { question: "Do you have opportunities to learn and grow?", score: 3.7, subtheme: "growth" },
      ],
      recentResponses: [
        { id: 1, timestamp: new Date(2023, 4, 15, 9, 30), anonymous: true },
        { id: 2, timestamp: new Date(2023, 4, 15, 10, 45), anonymous: false, name: "Alex Johnson" },
        { id: 3, timestamp: new Date(2023, 4, 15, 11, 20), anonymous: true },
        { id: 4, timestamp: new Date(2023, 4, 15, 13, 15), anonymous: false, name: "Jamie Smith" },
        { id: 5, timestamp: new Date(2023, 4, 15, 14, 50), anonymous: true },
      ],
    })

    // Simulate real-time updates
    const interval = setInterval(() => {
      setResponseData((prev) => {
        // Randomly decide if we should update
        if (Math.random() > 0.7) {
          const newResponseRate = Math.min(100, prev.responseRate + Math.floor(Math.random() * 3))
          const newResponses = Math.ceil((newResponseRate / 100) * survey.teamMembers)

          return {
            ...prev,
            responseRate: newResponseRate,
            responses: newResponses,
            recentResponses: [
              {
                id: prev.recentResponses.length + 1,
                timestamp: new Date(),
                anonymous: Math.random() > 0.5,
                name: Math.random() > 0.5 ? "Chris Taylor" : "Morgan Lee",
              },
              ...prev.recentResponses.slice(0, 4),
            ],
          }
        }
        return prev
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [survey])

  const subthemeLabels: Record<string, string> = {
    communication: "Communication",
    collaboration: "Collaboration",
    leadership: "Leadership",
    worklife: "Work-Life Balance",
    growth: "Professional Growth",
  }

  const subthemeData = Object.entries(responseData.subthemeScores).map(([key, value]) => ({
    name: subthemeLabels[key] || key,
    value: value as number,
    fill: value >= 4 ? "#6EE7B7" : value >= 3 ? "#93C5FD" : "#FCA5A5",
  }))

  const questionData = responseData.questionScores.map((q: any) => ({
    name: q.question.length > 30 ? q.question.substring(0, 30) + "..." : q.question,
    score: q.score,
    subtheme: q.subtheme,
    fill: q.score >= 4 ? "#6EE7B7" : q.score >= 3 ? "#93C5FD" : "#FCA5A5",
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2937]">{survey.title}</h2>
        <p className="text-gray-500">
          {format(survey.startDate, "MMM d")} - {format(survey.endDate, "MMM d, yyyy")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full py-4">
              <div className="text-4xl font-bold text-[#60A5FA] mb-2">{responseData.responseRate}%</div>
              <Progress value={responseData.responseRate} className="h-2 w-full" />
              <p className="text-sm text-gray-500 mt-2">
                {responseData.responses} of {responseData.teamMembers} responses
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full py-4">
              <div className="text-4xl font-bold text-[#60A5FA] mb-2">{responseData.averageScore.toFixed(1)}</div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      star <= Math.round(responseData.averageScore)
                        ? "bg-[#60A5FA] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {star}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">out of 5.0</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 py-1">
              {responseData.recentResponses.slice(0, 3).map((response: any) => (
                <div key={response.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">{response.anonymous ? "Anonymous User" : response.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{format(new Date(response.timestamp), "h:mm a")}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subthemes">
        <TabsList>
          <TabsTrigger value="subthemes">Subtheme Scores</TabsTrigger>
          <TabsTrigger value="questions">Question Scores</TabsTrigger>
        </TabsList>

        <TabsContent value="subthemes" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subtheme Performance</CardTitle>
              <CardDescription>Average scores across different survey subthemes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subthemeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 5]} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltipContent>
                                <div className="font-medium">{payload[0].payload.name}</div>
                                <div className="text-sm text-muted-foreground">Score: {payload[0].value}</div>
                              </ChartTooltipContent>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {subthemeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Question Scores</CardTitle>
              <CardDescription>Average scores for individual questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={questionData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltipContent>
                                <div className="font-medium">{payload[0].payload.name}</div>
                                <div className="text-sm text-muted-foreground">Score: {payload[0].value}</div>
                                <div className="text-xs text-muted-foreground">
                                  Subtheme: {subthemeLabels[payload[0].payload.subtheme]}
                                </div>
                              </ChartTooltipContent>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {questionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
