import { Request, Response } from "express"
import User, { IUser } from "../models/user"
import { isUniqueField } from "../utils/isUniqueField"
import validator from "validator"
import bcrypt from "bcrypt"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 })
    return res.json(users)
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).select("-password")
    if (!user)
      return res.status(404).json({
        message: "Utilisateur introuvable !",
      })

    return res.json(user)
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { name, username, email, password, role } = req.body
  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs !",
      })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email invalide !",
      })
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Mot de passe invalide !",
      })
    }

    if (!(await isUniqueField<IUser>(User, "username", username))) {
      return res.status(400).json({
        message: "Cet utilisateur existe déjà !",
      })
    }
    if (!(await isUniqueField<IUser>(User, "email", email))) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé !",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || "reader",
    })

    const { password: _, ...u } = user.toObject()
    return res.status(201).json({
      message: "Utilisateur créé avec succès !",
      user: u,
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, username, email, password, role } = req.body
  try {
    const user = await User.findById(id)
    if (!user)
      return res.status(404).json({
        message: "Utilisateur introuvable !",
      })

    if (name) {
      user.name = name
    }

    if (username) {
      if (!(await isUniqueField<IUser>(User, "username", username, user.id))) {
        return res.status(400).json({
          message: "Cet utilisateur existe déjà !",
        })
      }
      user.username = username.trim()
    }

    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          message: "Email invalide !",
        })
      }
      if (!(await isUniqueField<IUser>(User, "email", email, user.id))) {
        return res.status(400).json({
          message: "Cet email est déjà utilisé !",
        })
      }
      user.email = email
    }

    if (password) {
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          message: "Mot de passe invalide !",
        })
      }
      user.password = await bcrypt.hash(password, 10)
    }

    if (role) {
      user.role = role
    }

    await user.save()
    const { password: _, ...u } = user.toObject()
    return res.status(200).json({
      message: "Utilisateur mis à jour avec succès !",
      user: u,
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user)
      return res.status(404).json({
        message: "Utilisateur introuvable !",
      })

    return res.status(200).json({
      message: "Utilisateur supprimé avec succès !",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur ${(error as any).message}`,
    })
  }
}
