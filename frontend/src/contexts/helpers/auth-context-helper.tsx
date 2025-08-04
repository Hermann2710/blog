import { createContext, useContext } from "react"

export interface User {
  _id: string
  name: string
  username: string
  email: string
  role: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, newToken: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider !")
  }

  return ctx
}
