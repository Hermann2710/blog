import { Document, model, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  username: string
  email: string
  password: string
  role: "admin" | "author" | "reader"
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "reader",
    },
  },
  { timestamps: true }
)

const User = model<IUser>("User", userSchema)

export default User
