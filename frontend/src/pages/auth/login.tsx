import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../../contexts/helpers/auth-context-helper"
import { useState, type FormEvent } from "react"
import { getErrorMessage } from "../../utils"
import { signIn } from "../../services/auth-service"
import FormInput from "../../components/form/input"
import { AiFillLock } from "react-icons/ai"
import { FaAt } from "react-icons/fa"
import Button from "../../components/form/button"
import type { LoginUserForm } from "../../types/user"

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [form, setForm] = useState<LoginUserForm>({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    try {
      const { user, token } = await signIn(form)
      login(user, token)
      navigate(callbackUrl)
    } catch (error) {
      setError(getErrorMessage(error))
    }
  }

  return (
    <div>
      <h1 className='text-center mb-4'>Connectez vous</h1>
      {error && (
        <p className='bg-red-100 text-red-700 font-medium text-center p-2'>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormInput<LoginUserForm>
          setData={setForm}
          label='Email'
          name='email'
          type='email'
          iconLeft={<FaAt />}
          value={form.email}
          placeholder='johndoe@example.com'
        />
        <FormInput<LoginUserForm>
          setData={setForm}
          label='Mot de passe'
          name='password'
          type='password'
          value={form.password}
          iconLeft={<AiFillLock />}
          placeholder='Mot de passe'
        />
        <Button type='submit' label="S'inscrire" className='w-full' />
      </form>
      <p className='p-2 text-sm text-center mt-4'>
        Vous êtes nouveau ?{" "}
        <Link
          to='/auth/register'
          className='font-medium text-blue-500 hover:text-blue-700 hover:underline transition'
        >
          Inscrivez vous !
        </Link>
      </p>
    </div>
  )
}
