import express from 'express'
import { Blog, Session, User } from '../models/index.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'
import { Op } from 'sequelize'

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog)
        return res.status(404).json({ error: 'no blog was found with this ID' })
    next()
}

const userFromAuthorization = async (req, res, next) => {
    let token = req.get('Authorization')
    if (!token)
        return res
            .status(400)
            .json({ error: 'no authorization token was given in the request' })

    token = token.split(' ')[1]
    const userFromToken = jwt.verify(token, SECRET)
    const session = await Session.findByPk(token)
    if (!session) {
        return res.status(400).json({ error: 'no server session exists with this token' })
    }

    const foundUser = await User.findByPk(userFromToken.id)
    if (foundUser?.disabled === true) {
        await session.destroy()
        return res.status(400).json({error: 'session terminated'})
    }

    req.user = userFromToken
    next()
}

export const router = express.Router()
router.get('/', async (req, res) => {
    let where = {}
    if (req.query.search) {
        where = {
            [Op.or]: [
                {
                    title: { [Op.iLike]: `%${req.query.search}%` }
                },
                {
                    author: { [Op.iLike]: `%${req.query.search}%` }
                }
            ]
        }
    }

    const blogs = await Blog.findAll({
        include: { model: User, attributes: ['username', 'id'] },
        attributes: { exclude: ['userId'] },
        where,
        order: [['likes', 'DESC']]
    })
    res.json(blogs)
})

router.post('/', userFromAuthorization, async (req, res) => {
    const createdBlog = await Blog.create({ ...req.body, userId: req.user.id })
    return res.json(createdBlog)
})

router.delete('/:id', userFromAuthorization, blogFinder, async (req, res) => {
    if (req.blog.userId !== req.user.id)
        return res.status(400).json({
            error: 'you are not the author of the blog you are trying to delete'
        })
    await req.blog.destroy()
    res.status(200).end()
})

router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    return res.json(await req.blog.save())
})
