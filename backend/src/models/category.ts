import { Document, model, Schema } from "mongoose"

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
  },
  { timestamps: true }
)

const Category = model<ICategory>("Category", categorySchema)

export default Category
