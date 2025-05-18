import express from 'express'
import { Blog, User } from '../models/index.js'
import { Op } from 'sequelize'

export const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
    const users = await User.findAll({
        include: { model: Blog, attributes: { exclude: ['userId', 'author'] } }
    })
    res.json(users)
})

userRouter.get('/:id', async (req, res) => {
    let param = req.query.read
    let read = { [Op.in]: [true, false] }
    if (param === 'true') {
        read = true
    }
    if (param === 'false') {
        read = false
    }

    console.log(read)

    const foundUser = await User.findByPk(req.params.id, {
        include: {
            model: Blog,

            as: 'readings',
            attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
            through: {
                attributes: ['id', 'read'],
                as: 'readinglists',
                where: { read: read }
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'id']
        }
    })
    if (!foundUser) return res.status(404).end()
    res.json(foundUser)
})

userRouter.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

userRouter.put('/:username', async (req, res) => {
    if (!req.body.username)
        return res.status(400).json({ error: 'no replacement username given' })
    const username = req.params.username
    const foundUser = await User.findOne({ where: { username: username } })
    if (!foundUser)
        return res.status(404).json({ error: 'no user was found with this username' })
    foundUser.username = req.body.username
    res.json(await foundUser.save())
})
