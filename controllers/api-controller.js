const endpoints = require("../endpoints.json")

exports.getEndpoints = async (req, res, next) => {
    try {
        return res.status(200).send({ endpoints })
    } catch {
        next(err)
    }
}