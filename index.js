import express from 'express'
import { router } from './controllers/blogs.js'
import { PORT } from './utils/config.js'
import { connectToDatabase } from './utils/db.js'
import { errorHandler } from './utils/errorHandler.js'
import { userRouter } from './controllers/users.js'
import { authRouter } from './controllers/login.js'
import {authorRouter} from './controllers/author.js'
import { readingListsRouter } from './controllers/readinglists.js'

const app = express()
app.use(express.json())

app.use('/api/blogs', router)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readingslist', readingListsRouter)

// Starting from Express 5, errors in async middleware are passed to next()
app.use(errorHandler)


app.listen(PORT, async () => {
    await connectToDatabase()
    console.log(`Example app listening on port ${PORT}`)
})
