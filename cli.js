import { Blog } from './models/blog'

const getBlogs = async () => {
    return await Blog.findAll()
}

console.log((await getBlogs()).forEach(({dataValues}) => console.log(`${dataValues.author}: '${dataValues.content}', ${dataValues.likes} likes`)))
