const { ClientError } = require("../lib/utils")

class SessionService{
  constructor(repository){
    this.repository = repository
  }

  async create({email, password}){

    const user = await this.repository.getUserByEmail({ email })

    if(!user){
      throw new ClientError("Email ou/e senha incorretos!", 401)
    }

    const isPasswordValid = await this.repository.comparePassword({ 
      password, 
      currentPassword: user.password 
    })

    if(!isPasswordValid){
      throw new ClientError("Email ou/e senha incorretos!", 401)
    }

    const token = this.repository.createToken({ id: user.id, role: user.role })

    return {token, user}
  }
}

module.exports = SessionService