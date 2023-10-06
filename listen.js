const app = require("./app.js")
const { PORT = 9090 } = process.env

all.listen(PORT, () => console.log("listening on ${PORT}..."))