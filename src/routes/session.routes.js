const { Router } = require("express")
const SessionController = require("../controllers/session.controller")
const sessionRouter = Router()

const sessionController = new SessionController()

sessionRouter.post('/', sessionController.create)

module.exports = sessionRouter