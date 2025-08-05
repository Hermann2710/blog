import toast from "react-hot-toast"
import axiosClient from "../api/axiosClient"
import type { LoginUserForm, RegisterUserForm, User } from "../types/user"

export async function signIn(data: LoginUserForm) {
  const response = await axiosClient.post("/auth/login", data)
  toast.success(response.data.message)
  return {
    token: response.data.token as string,
    user: response.data.user as User,
  }
}

export async function signUp(data: RegisterUserForm) {
  const response = await axiosClient.post("/auth/register", data)
  toast.success(response.data.message)
  return {
    token: response.data.token as string,
    user: response.data.user as User,
  }
}
