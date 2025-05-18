import { Sequelize } from 'sequelize'
import { DATABASE_URL } from './config.js'
import { SequelizeStorage, Umzug } from 'umzug'

export const sequelize = new Sequelize(DATABASE_URL)

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: { glob: 'migrations/*.js' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console
    })

    const migrations = await migrator.up()
    console.log('Migrations up to date', { files: migrations.map(mig => mig.name) })
}

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('connected to the database')
    } catch (err) {
        console.log('failed to connect to the database: ', err)
        return process.exit(1)
    }
}
