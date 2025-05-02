"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import PulseSurveyDashboard from "@/components/pulse-survey/pulse-survey-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import ProtectedRoute from "@/components/auth/protected-route"
import { LogOut, User } from "lucide-react"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#F3F4F6]">
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold text-[#1F2937]">Pulse Survey Dashboard</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-[#60A5FA] text-white p-1 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-lg" />}>
            <PulseSurveyDashboard />
          </Suspense>
        </div>
      </main>
    </ProtectedRoute>
  )
}
