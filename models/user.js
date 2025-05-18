import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

export default sequelize.define(
    'user',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true }
        },
        name: { type: DataTypes.STRING, allowNull: false },
        disabled: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { underscored: true }
)
