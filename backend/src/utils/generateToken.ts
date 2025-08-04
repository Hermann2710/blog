import jwt from "jsonwebtoken"
import { appConfig } from "../config"

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, appConfig.secretKey, { expiresIn: "7d" })
}
