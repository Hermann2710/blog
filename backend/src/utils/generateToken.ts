import jwt from "jsonwebtoken"
import { appConfig } from "../config"

export const generateToken = (id: string) => {
  return jwt.sign({ id: id }, appConfig.secretKey, { expiresIn: "7d" })
}
