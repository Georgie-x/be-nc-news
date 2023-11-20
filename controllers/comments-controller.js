const { removeComment, updateComment } = require("../models/comments-model.js")

const deleteComment = async (req, res, next) => {
	try {
		const { comment_id } = req.params
		const response = await removeComment(comment_id)
		return res.status(response).send()
	} catch (err) {
		next(err)
	}
}



const patchComment = async (req, res, next) => {
	try {
		const newComment = req.body
		const { comment_id } = req.params
		const comment = await updateComment(newComment, comment_id)
		return res.status(200).send({ comment })
	} catch (err) {
		next(err)
	}
}

module.exports = { patchComment, deleteComment }
