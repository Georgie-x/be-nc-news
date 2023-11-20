const express = require("express")
const app = express()
const { getTopics } = require(".//controllers/topics-controller")
const { getEndpoints } = require(".//controllers/api-controller")
const {
	getArticleById,
	getArticles,
	getArticleComments,
	patchArticle,
	postArticle,
	postComment,
} = require(".//controllers/articles-controller")
const {
	deleteComment,
	patchComment,
} = require(".//controllers/comments-controller")
const { getUsers, getUser } = require(".//controllers/users-controller")
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
} = require("./controllers/errors-controller")

const cors = require("cors")

app.use(cors())

app.use(express.json())

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)

app.post("/api/articles", postArticle)

app.get("/api/articles/:article_id", getArticleById)

app.patch("/api/articles/:article_id", patchArticle)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/comments/:comment_id", patchComment)

app.delete("/api/comments/:comment_id", deleteComment)

app.get("/api/users", getUsers)

app.get("/api/users/:username", getUser)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

app.all("/*", (req, res) => {
	res.status(404).send({ message: "invalid path" })
})

module.exports = app
