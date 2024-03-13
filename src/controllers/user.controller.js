const UserService = require("../services/user.services")
const UserRepository = require("../repositories/user.repository")

const userRepository = new UserRepository()

const userService = new UserService(userRepository)

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body

    await userService.create({ name, email, password })

    return res.status(201).json({
      status:"success",
      message:"Usuário criado com sucesso!",
    })
  }
}

module.exports = UserController