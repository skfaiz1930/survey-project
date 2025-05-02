"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: string
  text: string
  type: "likert" | "open"
  subtheme: string
}

interface SurveyData {
  title: string
  description: string
  teamMembers: any[]
  deliverySystem: string[]
  questions: Question[]
  startDate: Date | null
  endDate: Date | null
  reminderFrequency: string
}

interface TestSurveyProps {
  surveyData: SurveyData
}

export default function TestSurvey({ surveyData }: TestSurveyProps) {
  const [testResponses, setTestResponses] = useState<Record<string, string>>({})
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [testError, setTestError] = useState<string | null>(null)

  const handleResponseChange = (questionId: string, value: string) => {
    setTestResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleTestSubmit = () => {
    // Check if all likert questions have responses
    const likertQuestions = surveyData.questions.filter((q) => q.type === "likert")
    const allLikertAnswered = likertQuestions.every((q) => testResponses[q.id])

    if (!allLikertAnswered) {
      setTestError("Please answer all Likert scale questions")
      return
    }

    setTestError(null)
    setTestSubmitted(true)

    // In a real app, you would send this data to your backend
    console.log("Test responses:", testResponses)
  }

  const handleReset = () => {
    setTestResponses({})
    setTestSubmitted(false)
    setTestError(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[#1F2937] mb-2">Test Survey</h3>
        <p className="text-sm text-gray-500 mb-4">Preview and test your survey before sending it to your team.</p>
      </div>

      <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircleIcon className="h-5 w-5 text-[#0369A1] mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-[#0369A1]">Test Mode</h4>
            <p className="text-xs text-[#0369A1] mt-1">
              This is a test preview of your survey. Responses submitted here will not be recorded in your actual survey
              results.
            </p>
          </div>
        </div>
      </div>

      {!testSubmitted ? (
        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle>{surveyData.title || "Untitled Survey"}</CardTitle>
            <CardDescription>{surveyData.description || "No description provided"}</CardDescription>
            <div className="text-xs text-gray-500 mt-2">
              {surveyData.startDate && surveyData.endDate ? (
                <p>
                  Survey period: {format(surveyData.startDate, "PPP")} to {format(surveyData.endDate, "PPP")}
                </p>
              ) : (
                <p>Survey period not set</p>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {surveyData.questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <h4 className="font-medium text-[#1F2937]">{question.text}</h4>

                {question.type === "likert" ? (
                  <RadioGroup
                    value={testResponses[question.id] || ""}
                    onValueChange={(value) => handleResponseChange(question.id, value)}
                    className="flex justify-between"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center space-y-1">
                        <RadioGroupItem
                          value={value.toString()}
                          id={`${question.id}-${value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`${question.id}-${value}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 peer-data-[state=checked]:bg-[#60A5FA] peer-data-[state=checked]:text-white hover:bg-gray-100 peer-data-[state=checked]:hover:bg-[#3B82F6]"
                        >
                          {value}
                        </Label>
                        <span className="text-xs text-gray-500">
                          {value === 1
                            ? "Strongly Disagree"
                            : value === 2
                              ? "Disagree"
                              : value === 3
                                ? "Neutral"
                                : value === 4
                                  ? "Agree"
                                  : "Strongly Agree"}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Textarea
                    placeholder="Type your answer here..."
                    value={testResponses[question.id] || ""}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    className="min-h-[100px]"
                  />
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            {testError && <p className="text-sm text-red-500 mb-2 w-full">{testError}</p>}
            <Button onClick={handleTestSubmit} className="w-full bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
              Submit Test Response
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="border-green-100 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2Icon className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-medium text-green-700">Test Completed Successfully</h3>
                <p className="text-green-600">
                  Your test response has been processed. In a real survey, this data would be recorded and analyzed.
                </p>
                <Button onClick={handleReset} variant="outline" className="mt-4">
                  Test Again
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test Response Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {surveyData.questions.map((question) => (
                  <div key={question.id} className="border-b pb-3">
                    <p className="font-medium text-sm">{question.text}</p>
                    {question.type === "likert" ? (
                      <div className="mt-2 flex items-center">
                        <span className="text-sm font-medium mr-2">Response:</span>
                        <span className="px-2 py-1 bg-[#60A5FA] text-white rounded-full text-xs">
                          {testResponses[question.id] || "Not answered"} / 5
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span className="text-sm font-medium">Response:</span>
                        <p className="text-sm mt-1 italic">{testResponses[question.id] || "No response provided"}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
