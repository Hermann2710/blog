import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "./helpers/auth-context-helper"
import axiosClient from "../api/axiosClient"
import type { User } from "../types/user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  useEffect(() => {
    if (token) {
      axiosClient
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => logout())
    }
  }, [token])

  const login = (user: User, newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    setUser(user)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
