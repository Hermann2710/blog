import { Outlet } from "react-router-dom"
import Navbar from "../ui/navbar"

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='max-w-6xl mx-auto p-4'>
        <Outlet />
      </div>
    </div>
  )
}
