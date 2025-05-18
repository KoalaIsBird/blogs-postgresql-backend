import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

export default sequelize.define(
    'session',
    {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    },
    { timestamps: true, underscored: true }
)
