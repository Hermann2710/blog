import { Request, Response } from "express"
import Category, { ICategory } from "../models/category"
import { slugify } from "../utils/slugify"
import { isUniqueField } from "../utils/isUniqueField"

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 })
    return res.json(categories)
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body
  try {
    if (!name)
      return res
        .status(400)
        .json({ message: "Le nom de la catégorie est obligatoire !" })

    const slug = slugify(name)
    if (!(await isUniqueField<ICategory>(Category, "slug", slug))) {
      return res.json({
        message: "Cette catégorie existe déjà !",
      })
    }

    const category = await Category.create({
      name,
      slug,
      description,
    })

    return res.status(201).json({
      category: category,
      message: "Catégorie crée avec succès !",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body
  const { id } = req.params
  try {
    const category = await Category.findById(id)
    if (!category)
      return res.status(404).json({
        message: "Cette catégorie n'existe pas !",
      })

    if (
      !(await isUniqueField<ICategory>(Category, "name", name, category.id))
    ) {
      return res.status(400).json({
        message: "Ce nom est déjà utilisé !",
      })
    }

    category.name = name
    category.slug = slugify(name)
    category.description = description
    await category.save()

    return res.status(200).json({
      category: category,
      message: "Catégorie mise à jour avec succès !",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const category = await Category.findByIdAndDelete(id)
    if (!category)
      return res.status(404).json({
        message: "Categorie introuvable !",
      })

    return res.json({
      message: "Catégorie supprimée avec succès !",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}
