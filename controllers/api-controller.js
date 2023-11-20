const endpoints = require("../endpoints.json")

const getEndpoints = async (req, res, next) => {
    try {
        return res.status(200).send({ endpoints })
    } catch {
        next(err)
    }
}

module.exports = {getEndpoints}