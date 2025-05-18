const { yearSchema } = require('../models/year')



module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', yearSchema)

    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year')
    }
}
