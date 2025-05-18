import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";


export const UserBlogs = sequelize.define('userBlog', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'user', key: 'id' },
            unique: 'uniqueUserBlog'
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'blog', key: 'id' },
            unique: 'uniqueUserBlog'
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {timestamps: false, underscored: true, indexes: [{unique: true, fields: ['userId', 'blogId']}]}
)