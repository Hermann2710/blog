type ButtonVariant = "primary" | "secondary" | "outline"

interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function Button({
  label,
  onClick,
  variant = "primary",
  className,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none"
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-200",
    outline:
      "border border-gray-400 text-gray-800 hover:bg-gray-100 disabled:text-gray-400",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  )
}
