import mongoose from "mongoose"
import { appConfig } from "."

const connectDB = async () => {
  try {
    await mongoose.connect(appConfig.mongoUri)
    console.log("Connexion réussie à MongoDB !")
  } catch (error) {
    console.error("Echec de la connexion à MongoDB: ", error)
    process.exit()
  }
}

export default connectDB
