require("express-async-errors")
const express = require('express')
const routes = require('./routes')

const app = express()

const { errorMiddleware } = require("./middlewares")

app.use(express.json())

app.use(routes)
app.use(errorMiddleware)

app.listen(process.env.PORT, () => console.log(
  "Listen to port: "+process.env.PORT
))