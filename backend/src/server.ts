import express from "express"
import cors from "cors"
import connectDB from "./config/db"
import authRoutes from "./routes/authRoute"
import { appConfig } from "./config"
import categoryRoutes from "./routes/categoryRoute"
import articleRoutes from "./routes/articleRoute"
import path from "path"
import userRoutes from "./routes/userRoutes"
import commentRoutes from "./routes/commentRoutes"

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/articles", articleRoutes)
app.use("/api/comments", commentRoutes)

app.listen(appConfig.port, () =>
  console.log(`Serveur démarré sur le port ${appConfig.port}`)
)
