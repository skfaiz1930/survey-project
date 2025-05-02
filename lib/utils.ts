import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to analyze sentiment using Pyodide
export async function analyzeSentiment(text: string): Promise<"positive" | "neutral" | "negative"> {
  // In a real implementation, this would use Pyodide to run Python code
  // For this demo, we'll use a simple keyword-based approach

  const positiveWords = ["good", "great", "excellent", "happy", "improved", "better", "like", "love", "appreciate"]
  const negativeWords = ["bad", "poor", "terrible", "unhappy", "worse", "dislike", "hate", "difficult", "problem"]

  const lowerText = text.toLowerCase()

  let positiveScore = 0
  let negativeScore = 0

  positiveWords.forEach((word) => {
    if (lowerText.includes(word)) positiveScore++
  })

  negativeWords.forEach((word) => {
    if (lowerText.includes(word)) negativeScore++
  })

  if (positiveScore > negativeScore) return "positive"
  if (negativeScore > positiveScore) return "negative"
  return "neutral"
}

// Utility function to generate personalized nudges based on survey results
export function generateNudges(subtheme: string, score: number): string[] {
  if (score >= 4) return [] // No nudges needed for high scores

  const nudges: Record<string, string[]> = {
    communication: [
      "Try scheduling a 1:1 to clarify goals and expectations",
      "Consider using more visual aids in your communications",
      "Set up a regular team standup to improve information flow",
    ],
    collaboration: [
      "Set up a team brainstorming session for your next project",
      "Try using collaborative tools like Miro or Figma",
      "Establish clear roles and responsibilities for team projects",
    ],
    leadership: [
      "Schedule regular check-ins with your team members",
      "Share the bigger picture and how individual work contributes",
      "Provide more specific feedback on team members' work",
    ],
    worklife: [
      "Try implementing no-meeting Fridays",
      "Encourage team members to take their full vacation time",
      "Set clear boundaries for after-hours communication",
    ],
    growth: [
      "Share learning resources related to your team's work",
      "Allocate time for professional development each week",
      "Create a mentorship program within your team",
    ],
  }

  return nudges[subtheme] || []
}
