import { Router } from 'express'
import { Blog } from '../models/index.js'
import { col, fn } from 'sequelize'

export const authorRouter = Router()

authorRouter.get('/', async (req, res) => {
    res.json(
        await Blog.findAll({
            attributes: [
                'author',
                [fn('SUM', col('likes')), 'likes'],
                [fn('COUNT', col('author')), 'articles']
            ],
            group: ['author'],
            order: [['likes', 'DESC']]
        })
    )
})
