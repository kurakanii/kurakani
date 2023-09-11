import { z } from 'zod'
import PostModel from '../../models/post.schema'
import { publicProcedure } from '../../utils/trpc'

export const getPostByUserId = publicProcedure
    .input(z.string())
    .query(async opts => {
        return await PostModel.find({ userId: opts.input })
            .populate('userId')
            .populate({ path: 'comments', select: ['content', 'userId'] })
    })