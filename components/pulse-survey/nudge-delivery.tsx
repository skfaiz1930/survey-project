"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2Icon, XCircleIcon, ClockIcon, SendIcon, ThumbsUpIcon, BookmarkIcon } from "lucide-react"
import { format } from "date-fns"

interface NudgeDeliveryProps {
  surveyId: string
}

export default function NudgeDelivery({ surveyId }: NudgeDeliveryProps) {
  const [nudges, setNudges] = useState([
    {
      id: "1",
      recipient: "Alex Johnson",
      email: "alex.johnson@example.com",
      subtheme: "communication",
      nudgeText: "Try scheduling a 1:1 to clarify goals and expectations",
      status: "delivered",
      deliveredAt: new Date(2023, 4, 16, 9, 30),
      engagement: "liked",
    },
    {
      id: "2",
      recipient: "Jamie Smith",
      email: "jamie.smith@example.com",
      subtheme: "leadership",
      nudgeText: "Schedule regular check-ins with your team members",
      status: "delivered",
      deliveredAt: new Date(2023, 4, 16, 9, 35),
      engagement: "done",
    },
    {
      id: "3",
      recipient: "Taylor Wong",
      email: "taylor.wong@example.com",
      subtheme: "collaboration",
      nudgeText: "Set up a team brainstorming session for your next project",
      status: "pending",
      deliveredAt: null,
      engagement: null,
    },
    {
      id: "4",
      recipient: "Morgan Lee",
      email: "morgan.lee@example.com",
      subtheme: "worklife",
      nudgeText: "Try implementing no-meeting Fridays",
      status: "failed",
      deliveredAt: null,
      engagement: null,
    },
    {
      id: "5",
      recipient: "Casey Brown",
      email: "casey.brown@example.com",
      subtheme: "growth",
      nudgeText: "Share learning resources related to your team's work",
      status: "delivered",
      deliveredAt: new Date(2023, 4, 16, 9, 40),
      engagement: "saved",
    },
  ])

  const subthemeLabels: Record<string, string> = {
    communication: "Communication",
    collaboration: "Collaboration",
    leadership: "Leadership",
    worklife: "Work-Life Balance",
    growth: "Professional Growth",
  }

  const handleResendNudge = (nudgeId: string) => {
    setNudges((prev) =>
      prev.map((nudge) =>
        nudge.id === nudgeId
          ? {
              ...nudge,
              status: "delivered",
              deliveredAt: new Date(),
            }
          : nudge,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2Icon className="h-4 w-4 text-green-500" />
      case "pending":
        return <ClockIcon className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircleIcon className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getEngagementIcon = (engagement: string | null) => {
    if (!engagement) return null

    switch (engagement) {
      case "liked":
        return <ThumbsUpIcon className="h-4 w-4 text-green-500" />
      case "done":
        return <CheckCircle2Icon className="h-4 w-4 text-green-500" />
      case "saved":
        return <BookmarkIcon className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Nudge Delivery</CardTitle>
          <CardDescription>
            Track the delivery and engagement of personalized nudges based on survey results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Subtheme</TableHead>
                <TableHead>Nudge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nudges.map((nudge) => (
                <TableRow key={nudge.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{nudge.recipient}</div>
                      <div className="text-xs text-gray-500">{nudge.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{subthemeLabels[nudge.subtheme] || nudge.subtheme}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={nudge.nudgeText}>
                    {nudge.nudgeText}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(nudge.status)}
                      <span className="text-sm capitalize">{nudge.status}</span>
                      {nudge.deliveredAt && (
                        <span className="text-xs text-gray-500">{format(nudge.deliveredAt, "MMM d, h:mm a")}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {nudge.engagement ? (
                      <div className="flex items-center space-x-2">
                        {getEngagementIcon(nudge.engagement)}
                        <span className="text-sm capitalize">{nudge.engagement}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No engagement</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {nudge.status === "failed" && (
                      <Button
                        size="sm"
                        onClick={() => handleResendNudge(nudge.id)}
                        className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
                      >
                        <SendIcon className="h-4 w-4 mr-2" />
                        Resend
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nudge Engagement Summary</CardTitle>
          <CardDescription>Overview of how recipients are engaging with personalized nudges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#60A5FA]">{nudges.length}</div>
              <div className="text-sm text-gray-500">Total Nudges</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                {nudges.filter((n) => n.status === "delivered").length}
              </div>
              <div className="text-sm text-gray-500">Delivered</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {nudges.filter((n) => n.status === "pending").length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{nudges.filter((n) => n.engagement).length}</div>
              <div className="text-sm text-gray-500">Engaged</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Engagement by Subtheme</h4>
            <div className="space-y-2">
              {Object.entries(subthemeLabels).map(([key, label]) => {
                const subthemeNudges = nudges.filter((n) => n.subtheme === key)
                const engagedNudges = subthemeNudges.filter((n) => n.engagement)
                const engagementRate =
                  subthemeNudges.length > 0 ? (engagedNudges.length / subthemeNudges.length) * 100 : 0

                return (
                  <div key={key} className="flex items-center space-x-2">
                    <div className="w-24 text-sm">{label}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#60A5FA]" style={{ width: `${engagementRate}%` }}></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium w-12 text-right">{Math.round(engagementRate)}%</div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
