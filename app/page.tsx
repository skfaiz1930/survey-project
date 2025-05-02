"use client"

import type React from "react"

import { Suspense, useState, useEffect } from "react"
import PulseSurveyDashboard from "@/components/pulse-survey/pulse-survey-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F4F6] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1F2937] mb-6">Pulse Survey Dashboard</h1>
        <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-lg" />}>
          <ErrorBoundary
            fallback={
              <div className="p-6 bg-white rounded-lg shadow-sm">Error loading dashboard. Please refresh the page.</div>
            }
          >
            <PulseSurveyDashboard />
          </ErrorBoundary>
        </Suspense>
      </div>
    </main>
  )
}

// Simple error boundary component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught error:", error)
      setHasError(true)
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  if (hasError) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
