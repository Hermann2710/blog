import { AxiosError } from "axios"
import type { SetStateAction } from "react"
import type React from "react"

export function getErrorMessage(e: unknown) {
  if (e instanceof AxiosError) {
    return e.response ? e.response.data.message : e.message
  } else if (e instanceof Error) {
    return e.message
  } else {
    return String(e)
  }
}

export function handleInputChange<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setData: React.Dispatch<SetStateAction<T>>
) {
  const { name, value } = e.target
  setData((prev) => ({ ...prev, [name]: value }))
}
