const { removeComment } = require("../models/comments-model.js")

exports.deleteComment = async (req, res, next) => {
    try {
        const { comment_id } = req.params
        const response = await removeComment(comment_id)
        return res.status(response).send()
    } catch (err) {   
        next(err)
    }
}