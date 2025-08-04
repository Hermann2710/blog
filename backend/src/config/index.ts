export const appConfig = {
  port: parseInt(process.env.PORT || "5000"),
  mongoUri: process.env.MONGO_URI as string,
  secretKey: process.env.SECRET_KEY as string,
}
