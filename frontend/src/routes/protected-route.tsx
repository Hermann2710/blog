import type { ReactNode } from "react"
import { useAuth } from "../contexts/helpers/auth-context-helper"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedRouteProps {
  children: ReactNode
  roles?: string[]
}

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user)
    return (
      <Navigate
        to={`/auth/login?callbackUrl=${encodeURIComponent(location.pathname)}`}
      />
    )

  if (roles && !roles.includes(user.role))
    return <Navigate to='/unauthorized' />

  return children
}
