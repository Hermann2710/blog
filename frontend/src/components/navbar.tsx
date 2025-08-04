import { Link } from "react-router-dom"
import { useAuth } from "../contexts/helpers/auth-context-helper"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className='bg-gray-900 text-white p-4 flex items-center justify-between'>
      <Link to='/' className='font-bold'>
        Bloogg
      </Link>
      <div className='flex gap-4 items-center'>
        {user ? (
          <>
            <span>{user.username}</span>
            <button
              onClick={logout}
              className='bg-red-500 px-3 py-1 rounded hover:bg-red-700'
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to='/auth/login'>Connexion</Link>
            <Link to='/auth/register'>Inscription</Link>
          </>
        )}
      </div>
    </nav>
  )
}
