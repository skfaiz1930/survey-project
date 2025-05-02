// Simple auth implementation for demo purposes
// In a real app, you would use a proper auth solution like NextAuth.js

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
}

interface SignInCredentials {
  email: string
  password: string
}

interface SignUpCredentials {
  name: string
  email: string
  password: string
}

// Mock user database
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@example.com",
    role: "manager",
  },
  {
    id: "3",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
  },
]

// Mock passwords (in a real app, these would be hashed)
const MOCK_PASSWORDS: Record<string, string> = {
  "admin@example.com": "password123",
  "manager@example.com": "password123",
  "user@example.com": "password123",
}

// Current user session
let currentUser: User | null = null

export async function signIn({ email, password }: SignInCredentials): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user exists and password matches
  const user = MOCK_USERS.find((u) => u.email === email)
  if (user && MOCK_PASSWORDS[email] === password) {
    currentUser = user
    // In a real app, you would set a cookie or token here
    localStorage.setItem("user", JSON.stringify(user))
    return true
  }

  return false
}

export async function signUp({ name, email, password }: SignUpCredentials): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user already exists
  if (MOCK_USERS.some((u) => u.email === email)) {
    return false
  }

  // Create new user
  const newUser: User = {
    id: String(MOCK_USERS.length + 1),
    name,
    email,
    role: "user", // Default role for new users
  }

  // Add user to mock database
  MOCK_USERS.push(newUser)
  MOCK_PASSWORDS[email] = password

  // Set as current user
  currentUser = newUser
  localStorage.setItem("user", JSON.stringify(newUser))

  return true
}

export async function signOut(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  currentUser = null
  localStorage.removeItem("user")
}

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser

  // Try to get from localStorage
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser)
        return currentUser
      } catch (e) {
        console.error("Failed to parse stored user", e)
      }
    }
  }

  return null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function requireAuth(): User {
  const user = getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export type { User }
