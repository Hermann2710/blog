import { Document, model, Schema, Types } from "mongoose"

export interface IComment extends Document {
  content: string
  author: Types.ObjectId
  article: Types.ObjectId
}

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
  },
  { timestamps: true }
)

const Comment = model<IComment>("Comment", commentSchema)

export default Comment
