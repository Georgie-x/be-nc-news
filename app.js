const express = require("express")
const app = express()
const {getTopics} = require(".//controllers/topics-controller")
const {getEndpoints} = require(".//controllers/api-controller")

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)






app.all("/*", (req, res) => {
    res.status(404).send({message: "invalid path"})
})

module.exports = app