"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/auth/login")
      }
    }
  }, [user, isLoading, router])

  return (
    <main className="min-h-screen bg-[#F3F4F6] p-6 md:p-10 flex items-center justify-center">
      <div className="max-w-7xl mx-auto text-center">
        <Skeleton className="h-[400px] w-[600px] rounded-lg" />
      </div>
    </main>
  )
}
