import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./components/layouts/auth-layout"
import MainLayout from "./components/layouts/main-layout"

export default function App() {
  const router = createBrowserRouter([
    // Auth
    {
      path: "/auth",
      Component: AuthLayout,
      children: [
        {
          path: "register",
          async lazy() {
            const module = await import("./pages/auth/register")
            return { Component: module.default }
          },
        },
        {
          path: "login",
          async lazy() {
            const module = await import("./pages/auth/login")
            return { Component: module.default }
          },
        },
      ],
    },
    // Main
    {
      path: "/",
      Component: MainLayout,
      children: [
        {
          path: "/",
          index: true,
          async lazy() {
            const module = await import("./pages/main/home")
            return { Component: module.default }
          },
        },
        {
          path: "/articles",
          async lazy() {
            const module = await import("./pages/main/article/index")
            return { Component: module.default }
          },
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
