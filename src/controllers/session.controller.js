const SessionService = require("../services/session.service")
const SessionRepository = require("../repositories/session.repository")

const sessionRepository = new SessionRepository()
const sessionService = new SessionService(sessionRepository)

class SessionController {
  async create(req, res){
    const { email, password } = req.body
    
    const { token, user } = await sessionService.create({ email, password })


    return res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 10000
    }).json({
      status: "success",
      message: "Usuário autenticado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        favoriteDishesId: user.favorites_dishes_id,
      }
    });
    
  }
}

module.exports = SessionController