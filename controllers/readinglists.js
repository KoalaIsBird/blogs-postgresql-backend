import { Router } from 'express'
import { UserBlogs } from '../models/userBlog.js'

export const readingListsRouter = Router()

readingListsRouter.post('/', async (req, res) => {
    const { blogId, userId } = req.body
    res.json(await UserBlogs.create({ blogId, userId }))
})

readingListsRouter.put('/:id', async (req, res) => {
    const { read } = req.body
    if (!read)
        return res
            .status(400)
            .json({ error: 'no field "read" in request body has been found' })
    const foundJunction = await UserBlogs.findByPk(req.params.id)
    if (!foundJunction) return res.status(404).end()
    foundJunction.read = read
    return res.json(await foundJunction.save())
})
