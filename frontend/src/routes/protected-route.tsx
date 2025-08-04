import type { ReactNode } from "react"
import { useAuth } from "../contexts/helpers/auth-context-helper"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: ReactNode
  roles?: string[]
}

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) return <Navigate to='/auth/login' />
  if (roles && !roles.includes(user.role))
    return <Navigate to='/unauthorized' />

  return children
}
