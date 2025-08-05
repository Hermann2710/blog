import React, { useState } from "react"
import { type IconType } from "react-icons"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { handleInputChange } from "../../utils"

interface FormInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  iconLeft?: React.ReactNode
  passwordIconShow?: IconType // Icône œil
  passwordIconHide?: IconType // Icône œil barré
  setData: React.Dispatch<React.SetStateAction<T>>
}

export default function FormInput<T>({
  label,
  type = "text",
  iconLeft,
  passwordIconShow: PasswordIconShow = AiOutlineEye,
  passwordIconHide: PasswordIconHide = AiOutlineEyeInvisible,
  setData,
  ...props
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"
  const inputType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <div className='w-full'>
      {label && (
        <label className='block text-sm font-medium mb-1 text-gray-700'>
          {label}
        </label>
      )}
      <div className='relative'>
        {iconLeft && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
            {iconLeft}
          </div>
        )}

        <input
          type={inputType}
          className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${iconLeft ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
          `}
          onChange={(e) => handleInputChange(e, setData)}
          {...props}
        />

        {isPassword && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer'
          >
            {showPassword ? (
              <PasswordIconHide size={20} />
            ) : (
              <PasswordIconShow size={20} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
