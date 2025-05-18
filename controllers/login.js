import jwt from 'jsonwebtoken'
import { Session, User } from '../models/index.js'
import { Router } from 'express'
import { SECRET } from '../utils/config.js'

const authRouter = Router()

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body
    const foundUser = await User.findOne({ where: { username: username } })
    if (!foundUser) return res.status(404).json({ error: 'username does not exist' })
    console.log(foundUser)
    if (foundUser.disabled === true)
        return res.status(400).json({ error: 'cannot log in because account is disabled' })
    if (password !== 'secret') return res.status(400).json({ error: 'wrong password' })
    const token = jwt.sign({ username: foundUser.username, id: foundUser.id }, SECRET)
    await Session.create({ token: token })
    return res.json(token)
})

authRouter.delete('/logout', async (req, res) => {
    let token = req.get('Authorization')
    if (!token) return res.status(400).json({ error: 'no authorization token was given' })
    token = token.split(' ')[1]
    const foundSession = await Session.findByPk(token)
    if (!foundSession) {
        return res.status(404).end()
    }
    await foundSession.destroy()
    res.status(200).end()
})

export { authRouter }
