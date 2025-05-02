"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import TemplateManager from "@/components/pulse-survey/email-templates/template-manager"
import ProtectedRoute from "@/components/auth/protected-route"

export default function EmailTemplatesPage() {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#F3F4F6] p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <Button variant="outline" onClick={() => router.push("/dashboard")} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <TemplateManager />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
