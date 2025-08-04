import { Router } from "express"
import {
  createComment,
  deleteComment,
  getCommentsByArticle,
} from "../controllers/commentController"
import { protect } from "../middlewares/authMiddleware"

const commentRoutes = Router()

// Lister les commentaires d'un article (public)
commentRoutes.get("/:articleId", getCommentsByArticle)

// Ajouter un commentaire (connecté)
commentRoutes.post("/:articleId", protect, createComment)

// Supprimé un commentaire (connecté + propriétaire ou admin)
commentRoutes.delete("/:id", protect, deleteComment)

export default commentRoutes
