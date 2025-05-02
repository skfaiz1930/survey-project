"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import SurveyBuilder from "@/components/pulse-survey/survey-builder"
import ActiveSurveys from "@/components/pulse-survey/active-surveys"
import CompletedSurveys from "@/components/pulse-survey/completed-surveys"
import { useToast } from "@/hooks/use-toast"

export default function PulseSurveyDashboard() {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCreateSurvey = () => {
    setIsCreating(true)
  }

  // Add error handling to the toast
  const handleSurveyCreated = () => {
    setIsCreating(false)
    setError(null)
    toast({
      title: "Survey created",
      description: "Your pulse survey has been created successfully.",
    })
  }

  // Add error handling
  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    })
  }

  const handleCancel = () => {
    setIsCreating(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {isCreating ? (
        <SurveyBuilder onComplete={handleSurveyCreated} onCancel={handleCancel} onError={handleError} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#1F2937]">Pulse Surveys</h2>
            <Button onClick={handleCreateSurvey} className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Survey
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active Surveys</TabsTrigger>
              <TabsTrigger value="completed">Completed Surveys</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ActiveSurveys />
            </TabsContent>
            <TabsContent value="completed">
              <CompletedSurveys />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
