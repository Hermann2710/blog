import { Router } from "express"
import {
  createArticle,
  deleteArticle,
  getArticleBySlug,
  getArticles,
  updateArticle,
} from "../controllers/articleController"
import { protect } from "../middlewares/authMiddleware"
import { authorizeRoles } from "../middlewares/roleMiddleware"
import { upload } from "../middlewares/uploadMiddleware"

const articleRoutes = Router()

// Public
articleRoutes.get("/", getArticles)
articleRoutes.get("/:slug", getArticleBySlug)

// Protégé: auteur + admin
articleRoutes.post(
  "/",
  protect,
  authorizeRoles("admin", "author"),
  upload.single("coverImage"),
  createArticle
)
articleRoutes.put(
  "/:id",
  protect,
  authorizeRoles("admin", "author"),
  upload.single("coverImage"),
  updateArticle
)
articleRoutes.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "author"),
  deleteArticle
)

export default articleRoutes
