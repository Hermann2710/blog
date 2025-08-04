import express from "express"
import cors from "cors"
import connectDB from "./config/db"
import authRoutes from "./routes/authRoute"
import { appConfig } from "./config"
import categoryRoutes from "./routes/categoryRoute"

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)

app.listen(appConfig.port, () =>
  console.log(`Serveur démarré sur le port ${appConfig.port}`)
)
