import { Router } from "express"
import { getMe, loginUser, registerUser } from "../controllers/authController"
import { protect } from "../middlewares/authMiddleware"

const authRoutes = Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.get("/me", protect, getMe)

export default authRoutes
