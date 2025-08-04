import { Request, Response } from "express"
import Comment from "../models/comment"
import { AuthRequest } from "../middlewares/authMiddleware"

export const getCommentsByArticle = async (req: Request, res: Response) => {
  const { articleId } = req.params
  try {
    const comments = await Comment.find({ article: articleId })
      .populate("author", "name username")
      .sort({ createdAt: -1 })
    return res.json(comments)
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const createComment = async (req: AuthRequest, res: Response) => {
  const { content } = req.body
  const { articleId } = req.params
  try {
    if (!content)
      return res.status(400).json({
        message: "Le contenu est requis !",
      })

    const comment = await Comment.create({
      content,
      author: req.user?._id,
      article: articleId,
    })

    const populatedComment = await comment.populate("author", "name username")
    return res.status(201).json({
      message: "Commentaire ajouté !",
      comment: populatedComment,
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  try {
    const comment = await Comment.findById(id)
    if (!comment)
      return res.status(404).json({
        message: "Commentaire inexistant !",
      })

    if (
      req.user?.role !== "admin" &&
      comment.author.toString() !== req.user?.id
    ) {
      return res.status(403).json({
        message: "Accès refusé !",
      })
    }

    await comment.deleteOne()
    return res.json({
      message: "Commentaire supprimé !",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}
