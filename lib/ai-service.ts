// This is a mock AI service that simulates generating questions
// In a real application, this would connect to an AI service like OpenAI

interface Question {
  text: string
  type: "likert" | "open"
}

// Sample questions for different subthemes
const questionBank: Record<string, Question[]> = {
  communication: [
    { text: "How effectively does your manager communicate team goals?", type: "likert" },
    { text: "How clear are the expectations set for your role?", type: "likert" },
    { text: "How comfortable do you feel sharing ideas during team meetings?", type: "likert" },
    { text: "How would you rate the transparency of communication from leadership?", type: "likert" },
    { text: "How satisfied are you with the frequency of feedback from your manager?", type: "likert" },
    { text: "What communication channels do you find most effective for team collaboration?", type: "open" },
    { text: "What specific improvements would make team communication more effective?", type: "open" },
    { text: "How could information sharing be improved within the team?", type: "open" },
  ],
  collaboration: [
    { text: "How well does your team collaborate on projects?", type: "likert" },
    { text: "How effectively do team members share knowledge and resources?", type: "likert" },
    { text: "How inclusive is your team when making decisions?", type: "likert" },
    { text: "How would you rate cross-functional collaboration in your organization?", type: "likert" },
    { text: "How well does your team handle conflicts or disagreements?", type: "likert" },
    { text: "What barriers do you face when collaborating with team members?", type: "open" },
    { text: "What tools or processes would improve collaboration in your team?", type: "open" },
    { text: "How could team meetings be more collaborative and productive?", type: "open" },
  ],
  leadership: [
    { text: "How confident are you in the direction set by leadership?", type: "likert" },
    { text: "How well does leadership recognize and reward good performance?", type: "likert" },
    { text: "How approachable is your manager when you need support?", type: "likert" },
    { text: "How well does leadership handle organizational changes?", type: "likert" },
    { text: "How effectively does your manager help you develop professionally?", type: "likert" },
    { text: "What leadership qualities do you value most in a manager?", type: "open" },
    { text: "What could leadership do to better support your work?", type: "open" },
    { text: "How could decision-making processes be improved in your team?", type: "open" },
  ],
  worklife: [
    { text: "How would you rate your current work-life balance?", type: "likert" },
    { text: "How manageable is your current workload?", type: "likert" },
    { text: "How supported do you feel when you need time off?", type: "likert" },
    { text: "How well does your work schedule accommodate your personal needs?", type: "likert" },
    { text: "How would you rate the flexibility of your working arrangements?", type: "likert" },
    { text: "What specific changes would improve your work-life balance?", type: "open" },
    { text: "What workplace policies would better support your wellbeing?", type: "open" },
    { text: "How could the team better manage deadlines to reduce stress?", type: "open" },
  ],
  growth: [
    { text: "How satisfied are you with your professional growth opportunities?", type: "likert" },
    { text: "How clear is your career path within the organization?", type: "likert" },
    { text: "How well does your role utilize your skills and abilities?", type: "likert" },
    { text: "How supported do you feel in pursuing learning opportunities?", type: "likert" },
    { text: "How would you rate the quality of feedback for your professional development?", type: "likert" },
    { text: "What skills would you like to develop in the next six months?", type: "open" },
    { text: "What resources would help you achieve your career goals?", type: "open" },
    { text: "How could the organization better support your professional growth?", type: "open" },
  ],
}

// Function to randomly select questions from the bank
function getRandomQuestions(subtheme: string, count = 5): Question[] {
  const questions = questionBank[subtheme.toLowerCase()] || []

  if (questions.length === 0) {
    // If no questions for this subtheme, generate generic ones
    return [
      { text: `How would you rate the ${subtheme} in your team?`, type: "likert" },
      { text: `How satisfied are you with the ${subtheme} practices?`, type: "likert" },
      { text: `What could be improved regarding ${subtheme}?`, type: "open" },
    ]
  }

  // Ensure we have a mix of likert and open-ended questions
  const likertQuestions = questions.filter((q) => q.type === "likert")
  const openQuestions = questions.filter((q) => q.type === "open")

  const result: Question[] = []

  // Add 3-4 Likert questions
  const likertCount = Math.min(Math.floor(Math.random() * 2) + 3, likertQuestions.length)
  const shuffledLikert = [...likertQuestions].sort(() => 0.5 - Math.random())
  result.push(...shuffledLikert.slice(0, likertCount))

  // Add 1-2 open-ended questions
  const openCount = Math.min(Math.floor(Math.random() * 2) + 1, openQuestions.length)
  const shuffledOpen = [...openQuestions].sort(() => 0.5 - Math.random())
  result.push(...shuffledOpen.slice(0, openCount))

  return result.slice(0, count)
}

export async function generateQuestions(subtheme: string): Promise<Question[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return getRandomQuestions(subtheme)
}
