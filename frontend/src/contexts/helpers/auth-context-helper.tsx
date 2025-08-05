import { createContext, useContext } from "react"
import type { User } from "../../types/user"

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
