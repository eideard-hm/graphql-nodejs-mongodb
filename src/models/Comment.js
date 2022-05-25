import { Schema, model } from 'mongoose'

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
export default model('Comment', CommentSchema)
