import { ValidationError } from 'sequelize'

export function errorHandler(err, req, res, next) {
    console.log(err)
    if (err instanceof ValidationError) {
        return res
            .status(400)
            .json({
                error: `validation error(s) have occured: ${err.errors.map(
                    err => err.message
                )}`
            })
    }
    if (err instanceof Error) {
        res.status(400).json({ error: `an error has occured: ${err}` })
        return
    }
    next(err)
}
