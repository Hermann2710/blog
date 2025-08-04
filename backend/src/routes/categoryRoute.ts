import { Router } from "express"
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController"
import { protect } from "../middlewares/authMiddleware"
import { authorizeRoles } from "../middlewares/roleMiddleware"

const categoryRoutes = Router()

// Routes accéssibles par tous
categoryRoutes.get("/", getCategories)

// Réservées aux admins
categoryRoutes.post("/", protect, authorizeRoles("admin"), createCategory)
categoryRoutes.put("/:id", protect, authorizeRoles("admin"), updateCategory)
categoryRoutes.delete("/:id", protect, authorizeRoles("admin"), deleteCategory)

export default categoryRoutes
