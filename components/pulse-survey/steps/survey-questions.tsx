"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, Trash2Icon, MoveUpIcon, MoveDownIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Question {
  id: string
  text: string
  type: "likert" | "open"
  subtheme: string
}

interface SurveyQuestionsProps {
  title: string
  description: string
  questions: Question[]
  updateData: (data: { title: string; description: string; questions: Question[] }) => void
}

export default function SurveyQuestions({ title, description, questions, updateData }: SurveyQuestionsProps) {
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: "",
    text: "",
    type: "likert",
    subtheme: "communication",
  })
  const [errors, setErrors] = useState<{ text?: string; subtheme?: string }>({})
  const [activeTab, setActiveTab] = useState<string>("custom")

  const subthemes = [
    { value: "communication", label: "Communication" },
    { value: "collaboration", label: "Collaboration" },
    { value: "leadership", label: "Leadership" },
    { value: "worklife", label: "Work-Life Balance" },
    { value: "growth", label: "Professional Growth" },
  ]

  const templates = {
    communication: [
      { text: "How clear is your manager's feedback?", type: "likert" },
      { text: "How effective is communication within your team?", type: "likert" },
      { text: "Do you feel informed about important decisions?", type: "likert" },
      { text: "What could improve communication in your team?", type: "open" },
    ],
    collaboration: [
      { text: "Do you feel supported by your team?", type: "likert" },
      { text: "How well does your team work together on projects?", type: "likert" },
      { text: "Are team meetings productive?", type: "likert" },
      { text: "What would help improve collaboration in your team?", type: "open" },
    ],
    leadership: [
      { text: "Does your manager provide clear direction?", type: "likert" },
      { text: "How well does leadership communicate company goals?", type: "likert" },
      { text: "Do you feel recognized for your contributions?", type: "likert" },
      { text: "What could leadership do better?", type: "open" },
    ],
    worklife: [
      { text: "How would you rate your work-life balance?", type: "likert" },
      { text: "Do you feel your workload is manageable?", type: "likert" },
      { text: "Does your manager respect your time off?", type: "likert" },
      { text: "What would help improve your work-life balance?", type: "open" },
    ],
    growth: [
      { text: "Do you have opportunities to learn and grow?", type: "likert" },
      { text: "How satisfied are you with your career progression?", type: "likert" },
      { text: "Does your manager support your professional development?", type: "likert" },
      { text: "What skills would you like to develop?", type: "open" },
    ],
  }

  const validateQuestion = () => {
    const newErrors: { text?: string; subtheme?: string } = {}

    if (!newQuestion.text.trim()) newErrors.text = "Question text is required"
    if (!newQuestion.subtheme) newErrors.subtheme = "Subtheme is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddQuestion = () => {
    if (!validateQuestion()) return

    const questionToAdd = {
      ...newQuestion,
      id: Date.now().toString(),
    }

    updateData({
      title,
      description,
      questions: [...questions, questionToAdd],
    })

    // Reset form
    setNewQuestion({
      id: "",
      text: "",
      type: "likert",
      subtheme: "communication",
    })
    setErrors({})
  }

  const handleDeleteQuestion = (id: string) => {
    updateData({
      title,
      description,
      questions: questions.filter((q) => q.id !== id),
    })
  }

  const handleMoveQuestion = (id: string, direction: "up" | "down") => {
    const index = questions.findIndex((q) => q.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === questions.length - 1)) {
      return
    }

    const newQuestions = [...questions]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap questions
    ;[newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]]

    updateData({ title, description, questions: newQuestions })
  }

  const handleAddTemplate = (subtheme: string) => {
    const templateQuestions = templates[subtheme as keyof typeof templates] || []

    const newQuestions = templateQuestions.map((q) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: q.text,
      type: q.type as "likert" | "open",
      subtheme,
    }))

    updateData({
      title,
      description,
      questions: [...questions, ...newQuestions],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[#1F2937] mb-2">Survey Details & Questions</h3>
        <p className="text-sm text-gray-500 mb-4">Add a title, description, and questions for your pulse survey.</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Survey Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => updateData({ title: e.target.value, description, questions })}
            placeholder="May 2023 Pulse Survey"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Survey Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => updateData({ title, description: e.target.value, questions })}
            placeholder="This quick survey helps us understand how you're feeling about work."
            className="min-h-[80px]"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="custom">Custom Questions</TabsTrigger>
            <TabsTrigger value="templates">Question Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="custom">
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Question</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="question-text">Question</Label>
                      <Textarea
                        id="question-text"
                        value={newQuestion.text}
                        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                        placeholder="How satisfied are you with team communication?"
                      />
                      {errors.text && <p className="text-xs text-red-500">{errors.text}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="question-type">Question Type</Label>
                        <Select
                          value={newQuestion.type}
                          onValueChange={(value) =>
                            setNewQuestion({
                              ...newQuestion,
                              type: value as "likert" | "open",
                            })
                          }
                        >
                          <SelectTrigger id="question-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="likert">Likert Scale (1-5)</SelectItem>
                            <SelectItem value="open">Open-ended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="question-subtheme">Subtheme</Label>
                        <Select
                          value={newQuestion.subtheme}
                          onValueChange={(value) => setNewQuestion({ ...newQuestion, subtheme: value })}
                        >
                          <SelectTrigger id="question-subtheme">
                            <SelectValue placeholder="Select subtheme" />
                          </SelectTrigger>
                          <SelectContent>
                            {subthemes.map((subtheme) => (
                              <SelectItem key={subtheme.value} value={subtheme.value}>
                                {subtheme.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.subtheme && <p className="text-xs text-red-500">{errors.subtheme}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white" onClick={handleAddQuestion}>
                        Add Question
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>

              {questions.length > 0 ? (
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const subthemeLabel =
                      subthemes.find((s) => s.value === question.subtheme)?.label || question.subtheme

                    return (
                      <Card key={question.id} className="relative">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                                {question.type === "likert" ? "Likert Scale" : "Open-ended"}
                              </span>
                              <span className="text-xs font-medium px-2 py-1 bg-[#E0F2FE] text-[#0369A1] rounded-full">
                                {subthemeLabel}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMoveQuestion(question.id, "up")}
                                disabled={index === 0}
                                className="h-8 w-8"
                              >
                                <MoveUpIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMoveQuestion(question.id, "down")}
                                disabled={index === questions.length - 1}
                                className="h-8 w-8"
                              >
                                <MoveDownIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="h-8 w-8 text-red-500 hover:text-red-700"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#1F2937]">{question.text}</p>

                          {question.type === "likert" && (
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                              <span>Strongly Disagree (1)</span>
                              <span>Strongly Agree (5)</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  <p className="text-gray-500">No questions added yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subthemes.map((subtheme) => (
                <Card key={subtheme.value} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{subtheme.label}</CardTitle>
                    <CardDescription>
                      {subtheme.value === "communication" && "Questions about team and manager communication"}
                      {subtheme.value === "collaboration" && "Questions about teamwork and cooperation"}
                      {subtheme.value === "leadership" && "Questions about management and direction"}
                      {subtheme.value === "worklife" && "Questions about work-life balance"}
                      {subtheme.value === "growth" && "Questions about professional development"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ul className="space-y-2 text-sm">
                      {templates[subtheme.value as keyof typeof templates].slice(0, 2).map((q, i) => (
                        <li key={i} className="text-gray-600">
                          • {q.text}
                        </li>
                      ))}
                      <li className="text-gray-500">• ...and more</li>
                    </ul>
                    <Button
                      className="mt-4 w-full bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
                      onClick={() => handleAddTemplate(subtheme.value)}
                    >
                      Add Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
