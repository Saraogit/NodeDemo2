const express = require("express")
const urlRouter = require("./routes/urlRoutes")

const app = express()

app.use(express.json())

app.use("/api/v1/urls", urlRouter)

module.exports = app