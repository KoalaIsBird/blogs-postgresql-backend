import Blog  from './blog.js'
import Session from './session.js'
import  User  from './user.js'
import { UserBlogs } from './userBlog.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: UserBlogs, as: 'readings'})
Blog.belongsToMany(User, {through: UserBlogs})

export { Blog, User, Session}
