require("express-async-errors")
const express = require('express')
const routes = require('./routes')
const uploadConfigs = require("./configs/upload")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const { errorMiddleware } = require("./middlewares")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:[process.env.APP_URL],
  credentials:true
}))

app.use('/files', express.static(uploadConfigs.UPLOADS_FOLDER))
app.use(routes)
app.use(errorMiddleware)

app.listen(process.env.PORT, () => console.log(
  "Listen to port: "+process.env.PORT
))