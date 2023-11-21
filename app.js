const express = require("express")
const app = express()
const { getEndpoints } = require(".//controllers/api-controller")
const {
	articlesRouter,
	commentsRouter,
	usersRouter,
	topicsRouter,
} = require("./routes/")
const {handleCustomErrors, handlePsqlErrors, handleServerErrors} = require("./errors")
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.get("/api", getEndpoints)

app.use("/api/topics", topicsRouter)

app.use("/api/articles", articlesRouter)

app.use("/api/comments", commentsRouter)

app.use("/api/users", usersRouter)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)

app.all("/*", (req, res) => {
	res.status(404).send({ message: "invalid path" })
})

module.exports = app
