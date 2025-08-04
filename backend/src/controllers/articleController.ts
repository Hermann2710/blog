import { Request, Response } from "express"
import Article, { IArticle } from "../models/article"
import { slugify } from "../utils/slugify"
import { isUniqueField } from "../utils/isUniqueField"
import { AuthRequest } from "../middlewares/authMiddleware"

export const getArticles = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = "" } = req.query
  const query: any = {}

  try {
    if (search) {
      query.title = { $regex: search, $options: "i" }
    }

    const articles = await Article.find(query)
      .populate("author", "name username")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit)

    const total = await Article.countDocuments(query)

    return res.json({
      articles,
      total,
      page: +page,
      pages: Math.ceil(total / +limit),
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const getArticleBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params
  try {
    const article = await Article.findOne({ slug })
      .populate("author", "name username")
      .populate("category", "name")
    if (!article)
      return res.status(404).json({
        message: "Article introuvable",
      })

    return res.json(article)
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const createArticle = async (req: AuthRequest, res: Response) => {
  const { title, content, category, tags } = req.body
  try {
    if (!title || !content || !category) {
      return res.status(400).json({
        message: "Veuilez remplir tous les champs !",
      })
    }

    const slug = slugify(title)
    if (!(await isUniqueField<IArticle>(Article, "slug", slug))) {
      return res.status(400).json({
        message: "Un article avec ce titre existe déjà !",
      })
    }

    const article = await Article.create({
      title,
      slug,
      content,
      category,
      tags: tags ? tags.split(",").map((t: string) => t.trim()) : [],
      author: req.user?._id,
      coverImage: req.file ? `/uploads/${req.file.fieldname}` : undefined,
    })

    return res.status(201).json({
      message: "Article crée avec succès !",
      article: article,
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const updateArticle = async (req: AuthRequest, res: Response) => {
  const { title, content, category, tags } = req.body
  const { id } = req.params
  try {
    const article = await Article.findById(id)
    if (!article)
      return res.status(404).json({
        message: "Article introuvable !",
      })

    // Seul l'admin ou l'auteur peuvent modifier
    if (
      req.user?.role !== "admin" &&
      article.author.toString() !== req.user?.id
    ) {
      return res.status(403).json({
        message: "Accès refusé !",
      })
    }

    if (title) {
      const slug = slugify(title)
      if (!(await isUniqueField<IArticle>(Article, "slug", slug, article.id))) {
        return res.status(400).json({
          message: "Un article avec ce nom existe déjà !",
        })
      }

      article.title = title
      article.slug = slug
    }

    if (content) article.content = content
    if (category) article.category = category
    if (tags) article.tags = tags.split(",").map((t: string) => t.trim())
    if (req.file) article.coverImage = `/uploads/${req.file.filename}`

    await article.save()
    return res.json({
      message: "Article mis à jour",
      article,
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const deleteArticle = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  try {
    const article = await Article.findById(id)
    if (!article)
      return res.status(404).json({
        message: "Article introuvable",
      })

    if (
      req.user?.role !== "admin" &&
      article.author.toString() != req.user?.id
    ) {
      return res.status(403).json({
        message: "Accès réfusé !",
      })
    }

    await article.deleteOne()
    return res.json({
      message: "Article supprimé avec succès !",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}
