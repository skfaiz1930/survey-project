"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser, type User, signOut } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = getCurrentUser()
        setUser(currentUser)

        // Redirect if not authenticated and trying to access protected routes
        if (!currentUser && !isPublicRoute(pathname)) {
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  const logout = async () => {
    await signOut()
    setUser(null)
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>
}

// Helper to determine if a route is public
function isPublicRoute(pathname: string): boolean {
  const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"]
  return publicRoutes.includes(pathname)
}
