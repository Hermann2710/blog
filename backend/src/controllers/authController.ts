import { Request, Response } from "express"
import validator from "validator"
import bcrypt from "bcrypt"
import { isUniqueField } from "../utils/isUniqueField"
import User, { IUser } from "../models/user"
import { generateToken } from "../utils/generateToken"
import { AuthRequest } from "../middlewares/authMiddleware"

export const registerUser = async (req: Request, res: Response) => {
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
        message: "Ce nom d'utilisateur est déjà utilisé",
      })
    }
    if (!(await isUniqueField<IUser>(User, "email", email))) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé",
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
      user: u,
      token: generateToken(u.id, u.role),
      message: "Inscription réussie !",
    })
  } catch (error) {
    return res.status(500).json({
      message: `Erreur serveur: ${(error as any).message}`,
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: `Identifiants invalides !`,
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        message: "Identifiants invalides !",
      })
    }

    const { password: _, ...u } = user.toObject()
    return res.json({
      user: u,
      token: generateToken(u.id, u.role),
      message: "Connexion réussie !",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Erreur serveur: ${(error as any).message}`,
    })
  }
}

export const getMe = async (req: AuthRequest, res: Response) => {
  return res.json(req.user)
}
