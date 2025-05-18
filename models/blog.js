import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { yearSchema } from './year.js'

class Blog extends Model {}
Blog.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        author: DataTypes.TEXT,
        url: { type: DataTypes.TEXT, allowNull: false },
        title: { type: DataTypes.TEXT, allowNull: false },
        likes: { type: DataTypes.INTEGER, defaultValue: 0 },
        year: yearSchema
    },
    { sequelize: sequelize, underscored: true, modelName: 'blog' }
)

export default Blog
