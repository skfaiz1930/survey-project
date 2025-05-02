"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoveUpIcon, MoveDownIcon, Trash2Icon } from "lucide-react"

interface Question {
  id: string
  text: string
  type: "likert" | "open"
  subtheme: string
}

interface ConfirmTemplateProps {
  questions: Question[]
  updateData: (data: { questions: Question[] }) => void
}

export default function ConfirmTemplate({ questions, updateData }: ConfirmTemplateProps) {
  const [groupedQuestions, setGroupedQuestions] = useState(() => {
    const grouped: Record<string, Question[]> = {}

    questions.forEach((question) => {
      if (!grouped[question.subtheme]) {
        grouped[question.subtheme] = []
      }
      grouped[question.subtheme].push(question)
    })

    return grouped
  })

  const subthemeLabels: Record<string, string> = {
    communication: "Communication",
    collaboration: "Collaboration",
    leadership: "Leadership",
    worklife: "Work-Life Balance",
    growth: "Professional Growth",
  }

  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== id)
    updateData({ questions: updatedQuestions })

    // Update grouped questions
    const newGrouped: Record<string, Question[]> = {}
    updatedQuestions.forEach((question) => {
      if (!newGrouped[question.subtheme]) {
        newGrouped[question.subtheme] = []
      }
      newGrouped[question.subtheme].push(question)
    })
    setGroupedQuestions(newGrouped)
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

    updateData({ questions: newQuestions })

    // Update grouped questions
    const newGrouped: Record<string, Question[]> = {}
    newQuestions.forEach((question) => {
      if (!newGrouped[question.subtheme]) {
        newGrouped[question.subtheme] = []
      }
      newGrouped[question.subtheme].push(question)
    })
    setGroupedQuestions(newGrouped)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[#1F2937] mb-2">Confirm Survey Template</h3>
        <p className="text-sm text-gray-500 mb-4">Review and confirm your survey questions before proceeding.</p>
      </div>

      {questions.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedQuestions).map(([subtheme, subthemeQuestions]) => (
            <Card key={subtheme} className="overflow-hidden">
              <CardHeader className="pb-2 bg-gray-50">
                <CardTitle className="text-base">{subthemeLabels[subtheme] || subtheme}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60%]">Question</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subthemeQuestions.map((question) => {
                      const questionIndex = questions.findIndex((q) => q.id === question.id)

                      return (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium">{question.text}</TableCell>
                          <TableCell>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                              {question.type === "likert" ? "Likert Scale" : "Open-ended"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMoveQuestion(question.id, "up")}
                                disabled={questionIndex === 0}
                                className="h-8 w-8"
                              >
                                <MoveUpIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMoveQuestion(question.id, "down")}
                                disabled={questionIndex === questions.length - 1}
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
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-red-500">No questions have been added. Please go back and add questions.</p>
        </div>
      )}
    </div>
  )
}
