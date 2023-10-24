const express = require("express")
const app = express()
const { getTopics } = require(".//controllers/topics-controller")
const { getEndpoints } = require(".//controllers/api-controller")
const { getArticleById, getArticles, getArticleComments, postComment, patchArticle } = require(".//controllers/articles-controller")
const { deleteComment } = require(".//controllers/comments-controller")
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchArticle)

app.delete("/api/comments/:comment_id", deleteComment)










app.post("/api/articles/:article_id/comments", postComment)


app.use((err, req, res, next) => {
    if (err.code === "22P02") {
    res.status(400).send({message: "invalid article id"})
    } else {
    next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(err.status).send({message: err.message})
})

app.all("/*", (req, res) => {
    res.status(404).send({message: "invalid path"})
})

module.exports = app