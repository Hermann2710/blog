import { Document, model, Schema, Types } from "mongoose"

export interface IArticle extends Document {
  title: string
  slug: string
  content: string
  author: Types.ObjectId
  category: Types.ObjectId
  tags?: string[]
  coverImage: string
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, require: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [String],
    coverImage: String,
  },
  { timestamps: true }
)

const Article = model<IArticle>("Article", articleSchema)

export default Article
