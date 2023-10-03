const express = require("express")
const app = express()
const { getTopics } = require(".//controllers/topics-controller")
const { getEndpoints } = require(".//controllers/api-controller")
const { getArticleById } = require(".//controllers/articles-controller")

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticleById)


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