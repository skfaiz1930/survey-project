"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import AddTeamMembers from "@/components/pulse-survey/steps/add-team-members"
import DeliverySystem from "@/components/pulse-survey/steps/delivery-system"
import SurveyQuestions from "@/components/pulse-survey/steps/survey-questions"
import ConfirmTemplate from "@/components/pulse-survey/steps/confirm-template"
import ScheduleSurvey from "@/components/pulse-survey/steps/schedule-survey"
import TestSurvey from "@/components/pulse-survey/steps/test-survey"
import { Progress } from "@/components/ui/progress"

interface SurveyBuilderProps {
  onComplete: () => void
  onCancel: () => void
}

export default function SurveyBuilder({ onComplete, onCancel }: SurveyBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    teamMembers: [],
    deliverySystem: [],
    questions: [],
    startDate: null,
    endDate: null,
    reminderFrequency: "3days",
  })

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const updateSurveyData = (data: any) => {
    setSurveyData((prev) => ({ ...prev, ...(data || {}) }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Here you would typically save the survey data to your backend
    console.log("Survey data:", surveyData)
    onComplete()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AddTeamMembers teamMembers={surveyData.teamMembers} updateData={updateSurveyData} />
      case 2:
        return <DeliverySystem deliverySystem={surveyData.deliverySystem} updateData={updateSurveyData} />
      case 3:
        return (
          <SurveyQuestions
            title={surveyData.title}
            description={surveyData.description}
            questions={surveyData.questions}
            updateData={updateSurveyData}
          />
        )
      case 4:
        return <ConfirmTemplate questions={surveyData.questions} updateData={updateSurveyData} />
      case 5:
        return (
          <ScheduleSurvey
            startDate={surveyData.startDate}
            endDate={surveyData.endDate}
            reminderFrequency={surveyData.reminderFrequency}
            updateData={updateSurveyData}
          />
        )
      case 6:
        return <TestSurvey surveyData={surveyData} />
      default:
        return null
    }
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return surveyData.teamMembers.length === 0
      case 2:
        return surveyData.deliverySystem.length === 0
      case 3:
        return surveyData.questions.length === 0 || !surveyData.title
      case 4:
        return false
      case 5:
        return !surveyData.startDate || !surveyData.endDate
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#1F2937]">Create Pulse Survey</h2>
        <div className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      <Progress value={progress} className="h-2 bg-gray-200" />

      <Card className="p-6 shadow-sm">{renderStep()}</Card>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onCancel : handleBack}
          className="border-gray-300 text-gray-700"
        >
          {currentStep === 1 ? (
            "Cancel"
          ) : (
            <>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </>
          )}
        </Button>

        <Button onClick={handleNext} disabled={isNextDisabled()} className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
          {currentStep === totalSteps ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Complete
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
