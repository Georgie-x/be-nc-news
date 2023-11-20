const { fetchTopics } = require("../models/topics-model")

const getTopics = async (req, res, next) => {
    try{
        const topics = await fetchTopics()
        return res.status(200).send({ topics })
    } catch {
        next(err)
    }
}

module.exports = {getTopics}
