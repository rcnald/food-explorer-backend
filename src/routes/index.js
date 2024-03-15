const { Router } = require("express")

const userRoutes = require("./user.routes")
const sessionRoutes = require("./session.routes")
const dishRoutes = require("./dish.routes")

const routes = Router()


routes.use("/users", userRoutes)
routes.use("/session", sessionRoutes)
routes.use("/dish", dishRoutes)

module.exports = routes