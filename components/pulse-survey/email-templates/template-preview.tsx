"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  isCustom: boolean
}

interface TemplatePreviewProps {
  template: EmailTemplate
}

export default function TemplatePreview({ template }: TemplatePreviewProps) {
  const [previewData, setPreviewData] = useState({
    recipient_name: "John Doe",
    survey_title: "Q2 Team Pulse Check",
    survey_subtheme: "Communication",
    start_date: "May 15, 2023",
    end_date: "May 30, 2023",
    survey_link: "https://example.com/survey/123",
    sender_name: "Alex Johnson",
  })

  const replaceVariables = (text: string) => {
    return text.replace(/{{(\w+)}}/g, (match, variable) => {
      return previewData[variable as keyof typeof previewData] || match
    })
  }

  const subject = replaceVariables(template.subject)
  const body = replaceVariables(template.body)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="test-data">Test Data</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <div className="border rounded-lg p-4 space-y-4">
            <div>
              <Label className="text-xs text-gray-500">From</Label>
              <div className="text-sm">
                Pulse Survey <span className="text-gray-500">&lt;no-reply@example.com&gt;</span>
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-500">To</Label>
              <div className="text-sm">
                {previewData.recipient_name} <span className="text-gray-500">&lt;recipient@example.com&gt;</span>
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-500">Subject</Label>
              <div className="text-sm font-medium">{subject}</div>
            </div>

            <div className="border-t pt-4">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: body }} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="test-data">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipient_name">Recipient Name</Label>
                <Input
                  id="recipient_name"
                  value={previewData.recipient_name}
                  onChange={(e) => setPreviewData({ ...previewData, recipient_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="survey_title">Survey Title</Label>
                <Input
                  id="survey_title"
                  value={previewData.survey_title}
                  onChange={(e) => setPreviewData({ ...previewData, survey_title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="survey_subtheme">Survey Subtheme</Label>
                <Input
                  id="survey_subtheme"
                  value={previewData.survey_subtheme}
                  onChange={(e) => setPreviewData({ ...previewData, survey_subtheme: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sender_name">Sender Name</Label>
                <Input
                  id="sender_name"
                  value={previewData.sender_name}
                  onChange={(e) => setPreviewData({ ...previewData, sender_name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  value={previewData.start_date}
                  onChange={(e) => setPreviewData({ ...previewData, start_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  value={previewData.end_date}
                  onChange={(e) => setPreviewData({ ...previewData, end_date: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="survey_link">Survey Link</Label>
              <Input
                id="survey_link"
                value={previewData.survey_link}
                onChange={(e) => setPreviewData({ ...previewData, survey_link: e.target.value })}
              />
            </div>

            <Button
              className="w-full bg-[#60A5FA] hover:bg-[#3B82F6]"
              onClick={() => document.querySelector('[data-value="preview"]')?.click()}
            >
              Update Preview
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
