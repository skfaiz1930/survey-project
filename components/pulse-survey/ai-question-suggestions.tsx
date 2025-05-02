"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { PlusIcon, RefreshCwIcon, SparklesIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateQuestions } from "@/lib/ai-service"

interface AIQuestionSuggestionsProps {
  subtheme: string
  onAddQuestion: (question: { text: string; type: "likert" | "open"; subtheme: string }) => void
}

export default function AIQuestionSuggestions({ subtheme, onAddQuestion }: AIQuestionSuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Array<{ text: string; type: "likert" | "open" }>>([])
  const { toast } = useToast()

  const handleGenerateSuggestions = async () => {
    if (!subtheme) {
      toast({
        title: "No subtheme selected",
        description: "Please select a subtheme to generate questions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const questions = await generateQuestions(subtheme)
      setSuggestions(questions)
    } catch (error) {
      console.error("Error generating questions:", error)
      toast({
        title: "Error",
        description: "Failed to generate question suggestions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddQuestion = (question: { text: string; type: "likert" | "open" }) => {
    onAddQuestion({
      ...question,
      subtheme,
    })

    toast({
      title: "Question added",
      description: "AI-suggested question has been added to your survey",
    })
  }

  const getSubthemeLabel = (subtheme: string) => {
    const labels: Record<string, string> = {
      communication: "Communication",
      collaboration: "Collaboration",
      leadership: "Leadership",
      worklife: "Work-Life Balance",
      growth: "Professional Growth",
    }
    return labels[subtheme] || subtheme
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <SparklesIcon className="h-5 w-5 mr-2 text-[#60A5FA]" />
              AI Question Suggestions
            </CardTitle>
            <CardDescription>Get AI-powered question suggestions for {getSubthemeLabel(subtheme)}</CardDescription>
          </div>
          <Button
            onClick={handleGenerateSuggestions}
            disabled={isLoading}
            className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
          >
            {isLoading ? (
              <>Generating...</>
            ) : suggestions.length > 0 ? (
              <>
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Regenerate
              </>
            ) : (
              <>
                <SparklesIcon className="h-4 w-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-3">
            {suggestions.map((question, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm">{question.text}</p>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs">
                      {question.type === "likert" ? "Likert Scale" : "Open-ended"}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleAddQuestion(question)} className="ml-2">
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 border border-dashed rounded-lg">
            <p className="text-gray-500">No suggestions generated yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Click the Generate button to get AI-powered question suggestions.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500 pt-2">
        AI suggestions are based on best practices in employee feedback and engagement.
      </CardFooter>
    </Card>
  )
}
