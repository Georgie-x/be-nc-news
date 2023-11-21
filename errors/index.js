

const handleCustomErrors = (err, req, res, next) => {
	if (err.status && err.message) {
		res.status(err.status).send({ message: err.message })
	} else next(err)
}

const handlePsqlErrors = (err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ message: "Invalid input" })
	} else if (err.code === "42601") {
		res.status(400).send({ message: "Invalid syntax" })
	} else next(err)
}

const handleServerErrors = (err, req, res, next) => {
	if (err.status === 500) {
		console.log(err)
		res.status(500).send({ message: "Internal Server Error" })
	} else next(err)
}

module.exports= {handleCustomErrors, handlePsqlErrors, handleServerErrors}