import { NextFunction, Request, Response } from "express"
import User, { IUser } from "../models/user"
import jwt from "jsonwebtoken"
import { appConfig } from "../config"

export interface AuthRequest extends Request {
  user?: IUser
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({ message: "Non autorisé, token manquant !" })
  }

  try {
    const decoded = jwt.verify(token, appConfig.secretKey) as { id: string }
    req.user = (await User.findById(decoded.id).select("-password")) as IUser

    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur introuvable !" })
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: "Token invalide !" })
  }
}
