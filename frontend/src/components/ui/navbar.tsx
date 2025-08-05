import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/helpers/auth-context-helper"
import { FaSignOutAlt } from "react-icons/fa"
import toast from "react-hot-toast"

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    return toast.success("Vous avez été déconnecté !")
  }

  return (
    <div className='bg-gray-900 text-white p-4'>
      <nav className='flex items-center justify-between max-w-6xl mx-auto'>
        <Link to='/' className='font-bold text-2xl'>
          Bloogg
        </Link>
        <div className='flex gap-4 items-center'>
          {user ? (
            <>
              <span>{user.username}</span>
              <button
                onClick={handleLogout}
                className='bg-red-500 px-3 py-1 rounded hover:bg-red-700'
                title='Déconnexion'
              >
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/auth/login${
                  location.pathname !== "/"
                    ? `?callbackUrl=${encodeURIComponent(location.pathname)}`
                    : ""
                }`}
              >
                Connexion
              </Link>
              <Link
                to={`/auth/register${
                  location.pathname !== "/"
                    ? `?callbackUrl=${encodeURIComponent(location.pathname)}`
                    : ""
                }`}
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
