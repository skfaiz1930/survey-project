"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  CheckCircle2Icon,
  DownloadIcon,
  Share2Icon,
  AlertTriangleIcon,
  TrendingUpIcon,
  PaletteIcon,
} from "lucide-react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface SurveyScorecardProps {
  survey: any
}

export default function SurveyScorecard({ survey }: SurveyScorecardProps) {
  const [colorScheme, setColorScheme] = useState({
    primary: "#60A5FA",
    positive: "#6EE7B7",
    neutral: "#F59E0B",
    negative: "#FCA5A5",
    background: "#FFFFFF",
  })

  const subthemeLabels: Record<string, string> = {
    communication: "Communication",
    collaboration: "Collaboration",
    leadership: "Leadership",
    worklife: "Work-Life Balance",
    growth: "Professional Growth",
  }

  const subthemeData = Object.entries(survey.subthemeScores).map(([key, value]) => ({
    name: subthemeLabels[key] || key,
    value: value as number,
    fill: value >= 4 ? colorScheme.positive : value >= 3 ? colorScheme.primary : colorScheme.negative,
  }))

  const industryBenchmarks = {
    communication: 3.8,
    collaboration: 4.0,
    leadership: 3.7,
    worklife: 3.5,
    growth: 3.9,
  }

  const benchmarkData = Object.entries(survey.subthemeScores).map(([key, value]) => ({
    name: subthemeLabels[key] || key,
    actual: value as number,
    benchmark: industryBenchmarks[key as keyof typeof industryBenchmarks] || 3.8,
  }))

  const sentimentData = [
    { name: "Positive", value: survey.sentimentAnalysis.positive, fill: colorScheme.positive },
    { name: "Neutral", value: survey.sentimentAnalysis.neutral, fill: colorScheme.neutral },
    { name: "Negative", value: survey.sentimentAnalysis.negative, fill: colorScheme.negative },
  ]

  const openEndedResponses = [
    {
      text: "Communication has improved significantly in the last quarter.",
      sentiment: "positive",
    },
    {
      text: "I feel our team could collaborate better on cross-functional projects.",
      sentiment: "neutral",
    },
    {
      text: "Leadership needs to provide clearer direction on company goals.",
      sentiment: "negative",
    },
    {
      text: "I appreciate the flexibility in our work schedule.",
      sentiment: "positive",
    },
    {
      text: "More opportunities for professional development would be welcome.",
      sentiment: "neutral",
    },
  ]

  const handleColorChange = (key: string, value: string) => {
    setColorScheme((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleShareScorecard = () => {
    // In a real app, this would generate a shareable link or image
    console.log("Sharing scorecard")
  }

  const handleDownloadScorecard = () => {
    // In a real app, this would generate a PDF or PNG
    console.log("Downloading scorecard")
  }

  return (
    <div className="space-y-6" style={{ background: colorScheme.background }}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937]">{survey.title} - Scorecard</h2>
          <p className="text-gray-500">
            {format(survey.startDate, "MMM d")} - {format(survey.endDate, "MMM d, yyyy")}
          </p>
        </div>

        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PaletteIcon className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Customize Scorecard</DialogTitle>
                <DialogDescription>Adjust colors to match your company branding.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={colorScheme.primary}
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={colorScheme.primary}
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="positive-color">Positive Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="positive-color"
                        type="color"
                        value={colorScheme.positive}
                        onChange={(e) => handleColorChange("positive", e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={colorScheme.positive}
                        onChange={(e) => handleColorChange("positive", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neutral-color">Neutral Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="neutral-color"
                        type="color"
                        value={colorScheme.neutral}
                        onChange={(e) => handleColorChange("neutral", e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={colorScheme.neutral}
                        onChange={(e) => handleColorChange("neutral", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="negative-color">Negative Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="negative-color"
                        type="color"
                        value={colorScheme.negative}
                        onChange={(e) => handleColorChange("negative", e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={colorScheme.negative}
                        onChange={(e) => handleColorChange("negative", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="background-color"
                      type="color"
                      value={colorScheme.background}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={colorScheme.background}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <Button className="w-full" style={{ backgroundColor: colorScheme.primary }}>
                    Apply Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleShareScorecard}>
            <Share2Icon className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="outline" onClick={handleDownloadScorecard}>
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Survey Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Response Rate</span>
                <span className="font-medium">{survey.responseRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Responses</span>
                <span className="font-medium">
                  {survey.responses} / {survey.teamMembers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Average Score</span>
                <span className="font-medium">{survey.averageScore.toFixed(1)} / 5.0</span>
              </div>
              <Separator />
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Subtheme Performance</h4>
                <div className="space-y-2">
                  {Object.entries(survey.subthemeScores).map(([key, score]) => {
                    const label = subthemeLabels[key] || key
                    const value = score as number

                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm">{label}</span>
                        <span
                          className={`font-medium ${
                            value >= 4 ? "text-green-500" : value >= 3 ? "text-blue-500" : "text-red-500"
                          }`}
                        >
                          {value.toFixed(1)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-700">High-Scoring Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(survey.subthemeScores)
                      .filter(([_, score]) => (score as number) >= 4)
                      .map(([key, score]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-700">
                            {subthemeLabels[key] || key}: {(score as number).toFixed(1)}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-red-700">Low-Scoring Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(survey.subthemeScores)
                      .filter(([_, score]) => (score as number) < 3.5)
                      .map(([key, score]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <AlertTriangleIcon className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-700">
                            {subthemeLabels[key] || key}: {(score as number).toFixed(1)}
                          </span>
                        </div>
                      ))}
                    {Object.entries(survey.subthemeScores).filter(([_, score]) => (score as number) < 3.5).length ===
                      0 && <span className="text-sm text-red-700">No low-scoring areas identified</span>}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-700">Benchmark Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(survey.subthemeScores).map(([key, score]) => {
                      const benchmark = industryBenchmarks[key as keyof typeof industryBenchmarks] || 3.8
                      const diff = (score as number) - benchmark

                      return (
                        <div key={key} className="flex items-center space-x-2">
                          <TrendingUpIcon
                            className={`h-4 w-4 ${
                              diff >= 0.2 ? "text-green-500" : diff <= -0.2 ? "text-red-500" : "text-blue-500"
                            }`}
                          />
                          <span className="text-sm text-blue-700">
                            {subthemeLabels[key] || key}: {diff >= 0 ? "+" : ""}
                            {diff.toFixed(1)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subthemes">
        <TabsList>
          <TabsTrigger value="subthemes">Subtheme Analysis</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmark Comparison</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
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

        <TabsContent value="benchmarks" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Benchmark Comparison</CardTitle>
              <CardDescription>How your scores compare to industry benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 5]} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltipContent>
                                <div className="font-medium">{payload[0].payload.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Your Score: {payload[0].payload.actual}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Benchmark: {payload[0].payload.benchmark}
                                </div>
                              </ChartTooltipContent>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar name="Your Score" dataKey="actual" fill={colorScheme.primary} radius={[4, 4, 0, 0]} />
                      <Bar name="Industry Benchmark" dataKey="benchmark" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Analysis of open-ended responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltipContent>
                                  <div className="font-medium">{payload[0].name}</div>
                                  <div className="text-sm text-muted-foreground">{payload[0].value}%</div>
                                </ChartTooltipContent>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Responses</CardTitle>
                <CardDescription>Representative open-ended feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {openEndedResponses.map((response, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        response.sentiment === "positive"
                          ? "bg-green-50 border border-green-100"
                          : response.sentiment === "neutral"
                            ? "bg-yellow-50 border border-yellow-100"
                            : "bg-red-50 border border-red-100"
                      }`}
                    >
                      <p className="text-sm">"{response.text}"</p>
                      <div className="flex justify-end mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            response.sentiment === "positive"
                              ? "bg-green-100 text-green-700"
                              : response.sentiment === "neutral"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {response.sentiment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Nudges</CardTitle>
          <CardDescription>Based on survey results, the following nudges will be sent to team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(survey.subthemeScores)
              .filter(([_, score]) => (score as number) < 3.5)
              .map(([key, score]) => {
                const subtheme = subthemeLabels[key] || key

                return (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <AlertTriangleIcon className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          Low Score: {subtheme} ({(score as number).toFixed(1)})
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Team members who scored this area low will receive the following nudges:
                        </p>
                        <ul className="mt-2 space-y-2">
                          {key === "communication" && (
                            <>
                              <li className="text-sm">• Try scheduling a 1:1 to clarify goals and expectations</li>
                              <li className="text-sm">• Consider using more visual aids in your communications</li>
                            </>
                          )}
                          {key === "collaboration" && (
                            <>
                              <li className="text-sm">• Set up a team brainstorming session for your next project</li>
                              <li className="text-sm">• Try using collaborative tools like Miro or Figma</li>
                            </>
                          )}
                          {key === "leadership" && (
                            <>
                              <li className="text-sm">• Schedule regular check-ins with your team members</li>
                              <li className="text-sm">
                                • Share the bigger picture and how individual work contributes
                              </li>
                            </>
                          )}
                          {key === "worklife" && (
                            <>
                              <li className="text-sm">• Try implementing no-meeting Fridays</li>
                              <li className="text-sm">• Encourage team members to take their full vacation time</li>
                            </>
                          )}
                          {key === "growth" && (
                            <>
                              <li className="text-sm">• Share learning resources related to your team's work</li>
                              <li className="text-sm">• Allocate time for professional development each week</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}

            {Object.entries(survey.subthemeScores).filter(([_, score]) => (score as number) < 3.5).length === 0 && (
              <div className="text-center p-6 border border-dashed rounded-lg">
                <p className="text-gray-500">No low-scoring areas identified. No nudges will be sent.</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" style={{ backgroundColor: colorScheme.primary }}>
            Send Personalized Nudges
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
