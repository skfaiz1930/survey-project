"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon, Edit2Icon, Trash2Icon, CopyIcon, EyeIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import TemplatePreview from "@/components/pulse-survey/email-templates/template-preview"

// Sample predefined templates
const PREDEFINED_TEMPLATES = [
  {
    id: "template-1",
    name: "Survey Invitation",
    subject: "Your feedback matters: Complete our quick pulse survey",
    body: `
      <p>Hello {{recipient_name}},</p>
      <p>We value your input! Please take a moment to complete our pulse survey: <strong>{{survey_title}}</strong>.</p>
      <p>This brief survey will help us understand how you're feeling about {{survey_subtheme}} and identify areas where we can improve.</p>
      <p>The survey will be open from {{start_date}} to {{end_date}}.</p>
      <p><a href="{{survey_link}}" style="background-color: #60A5FA; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">Take the Survey</a></p>
      <p>Thank you for your participation!</p>
      <p>Best regards,<br>{{sender_name}}</p>
    `,
    isCustom: false,
  },
  {
    id: "template-2",
    name: "Survey Reminder",
    subject: "Reminder: Your survey response is still needed",
    body: `
      <p>Hello {{recipient_name}},</p>
      <p>This is a friendly reminder that we're still waiting for your response to our <strong>{{survey_title}}</strong> survey.</p>
      <p>Your feedback is important to us and will help shape our approach to {{survey_subtheme}}.</p>
      <p>The survey will close on {{end_date}}.</p>
      <p><a href="{{survey_link}}" style="background-color: #60A5FA; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">Complete the Survey</a></p>
      <p>Thank you for your time!</p>
      <p>Best regards,<br>{{sender_name}}</p>
    `,
    isCustom: false,
  },
  {
    id: "template-3",
    name: "Survey Completion Thank You",
    subject: "Thank you for your feedback",
    body: `
      <p>Hello {{recipient_name}},</p>
      <p>Thank you for completing the <strong>{{survey_title}}</strong> survey!</p>
      <p>Your feedback is valuable and will help us make improvements in {{survey_subtheme}}.</p>
      <p>We'll be reviewing all responses and will share a summary of the findings soon.</p>
      <p>Best regards,<br>{{sender_name}}</p>
    `,
    isCustom: false,
  },
]

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  isCustom: boolean
}

export default function TemplateManager() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([...PREDEFINED_TEMPLATES])
  const [activeTab, setActiveTab] = useState("predefined")
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [newTemplate, setNewTemplate] = useState<Omit<EmailTemplate, "id" | "isCustom">>({
    name: "",
    subject: "",
    body: "",
  })

  const { toast } = useToast()

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const template: EmailTemplate = {
      id: `custom-${Date.now()}`,
      name: newTemplate.name,
      subject: newTemplate.subject,
      body: newTemplate.body,
      isCustom: true,
    }

    setTemplates([...templates, template])
    setNewTemplate({ name: "", subject: "", body: "" })

    toast({
      title: "Template created",
      description: "Your email template has been created successfully",
    })
  }

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return

    setTemplates(templates.map((t) => (t.id === editingTemplate.id ? editingTemplate : t)))

    setEditingTemplate(null)

    toast({
      title: "Template updated",
      description: "Your email template has been updated successfully",
    })
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id))

    toast({
      title: "Template deleted",
      description: "Your email template has been deleted",
    })
  }

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: `custom-${Date.now()}`,
      name: `${template.name} (Copy)`,
      isCustom: true,
    }

    setTemplates([...templates, newTemplate])

    toast({
      title: "Template duplicated",
      description: "A copy of the template has been created",
    })
  }

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const customTemplates = templates.filter((t) => t.isCustom)
  const predefinedTemplates = templates.filter((t) => !t.isCustom)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F2937]">Email Templates</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Email Template</DialogTitle>
              <DialogDescription>
                Create a new email template for your surveys. You can use variables like {{ recipient_name }},{" "}
                {{ survey_title }}, etc.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="e.g., Custom Invitation"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                  placeholder="e.g., Please complete our survey"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={newTemplate.body}
                  onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
                  placeholder="Enter the email body. You can use HTML and variables like {{recipient_name}}."
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                <p className="font-medium mb-1">Available Variables:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{{ recipient_name }}: The name of the recipient</li>
                  <li>{{ survey_title }}: The title of the survey</li>
                  <li>{{ survey_subtheme }}: The subtheme of the survey</li>
                  <li>{{ start_date }}: The start date of the survey</li>
                  <li>{{ end_date }}: The end date of the survey</li>
                  <li>{{ survey_link }}: The link to the survey</li>
                  <li>{{ sender_name }}: Your name</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewTemplate({ name: "", subject: "", body: "" })}>
                Reset
              </Button>
              <Button className="bg-[#60A5FA] hover:bg-[#3B82F6]" onClick={handleCreateTemplate}>
                Create Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="predefined">Predefined Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="predefined">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predefinedTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-1">{template.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="text-sm text-gray-500 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: template.body }}
                  />
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleDuplicateTemplate(template)}>
                    <CopyIcon className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
                    <EyeIcon className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          {customTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="line-clamp-1">{template.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="text-sm text-gray-500 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: template.body }}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingTemplate(template)}>
                      <Edit2Icon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                      <Trash2Icon className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-dashed rounded-lg">
              <p className="text-gray-500">No custom templates found.</p>
              <p className="text-sm text-gray-400 mt-1">Create a new template or duplicate a predefined one.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Template Dialog */}
      <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
          </DialogHeader>
          {editingTemplate && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Template Name</Label>
                <Input
                  id="edit-name"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-subject">Email Subject</Label>
                <Input
                  id="edit-subject"
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-body">Email Body</Label>
                <Textarea
                  id="edit-body"
                  value={editingTemplate.body}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                <p className="font-medium mb-1">Available Variables:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{{ recipient_name }}: The name of the recipient</li>
                  <li>{{ survey_title }}: The title of the survey</li>
                  <li>{{ survey_subtheme }}: The subtheme of the survey</li>
                  <li>{{ start_date }}: The start date of the survey</li>
                  <li>{{ end_date }}: The end date of the survey</li>
                  <li>{{ survey_link }}: The link to the survey</li>
                  <li>{{ sender_name }}: Your name</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTemplate(null)}>
              Cancel
            </Button>
            <Button className="bg-[#60A5FA] hover:bg-[#3B82F6]" onClick={handleUpdateTemplate}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Email Template Preview</DialogTitle>
          </DialogHeader>
          {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
