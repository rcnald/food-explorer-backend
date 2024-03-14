const SessionService = require("../services/session.service")
const SessionRepository = require("../repositories/session.repository")

const sessionRepository = new SessionRepository()
const sessionService = new SessionService(sessionRepository)

class SessionController {
  async create(req, res){
    const { email, password } = req.body
    
    const token = await sessionService.create({ email, password })

    return res.json({ token })
  }
}

module.exports = SessionController