import { Router } from "express"
import { protect } from "../middlewares/authMiddleware"
import { authorizeRoles } from "../middlewares/roleMiddleware"
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController"

const userRoutes = Router()

// Toutes les routes sont réservées à l'admin
userRoutes.use(protect, authorizeRoles("admin"))

userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUserById)
userRoutes.post("/", createUser)
userRoutes.put("/:id", updateUser)
userRoutes.delete("/:id", deleteUser)

export default userRoutes
