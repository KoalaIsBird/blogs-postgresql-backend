import { DataTypes } from 'sequelize'

export const yearSchema = {
    type: DataTypes.INTEGER,
    validate: {
        isInGoodRange(value) {
            const MIN_YEAR = 1991
            const CURRENT_YEAR = new Date().getFullYear()
            if (value < MIN_YEAR || value > CURRENT_YEAR) {
                throw new Error(
                    `Year must be higher or equal to ${MIN_YEAR} and smaller or equal to the current year`
                )
            }
        }
    }
}
