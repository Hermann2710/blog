import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full p-6 shadow rounded bg-white'>
        <div className='p-4 flex justify-center items-center'>
          <Link
            to='/'
            className='text-3xl font-bold text-blue-500 hover:text-blue-700 transition'
          >
            Bloogg
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
