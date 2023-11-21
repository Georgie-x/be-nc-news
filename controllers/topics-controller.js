const { fetchTopics, insertTopic } = require("../models/topics-model")

const getTopics = async (req, res, next) => {
    try{
        const topics = await fetchTopics()
        return res.status(200).send({ topics })
    } catch(err){
        next(err)
    }
}
const postTopic = async (req, res, next) => {
    try{
        const {slug, description} = req.body
        const topic = await insertTopic(slug, description)
        return res.status(201).send({ topic })
    } catch(err){
        next(err)
    }
}

module.exports = {getTopics, postTopic}
