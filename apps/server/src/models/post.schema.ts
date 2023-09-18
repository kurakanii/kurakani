import mongoose, { InferSchemaType, Types } from "mongoose"

const postSchema = new mongoose.Schema(
    {
        content: String,
        image: String,
        likes_count: Number,
        user_id: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [
            {
                type: Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true },
)

type Post = InferSchemaType<typeof postSchema>

const PostModel = mongoose.model<Post>("Post", postSchema)

export default PostModel
