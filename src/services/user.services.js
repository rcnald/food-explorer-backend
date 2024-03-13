const { hashPassword, isEmailValid, ClientError } = require("../lib/utils")

class UserService {
  constructor(repository){
    this.repository = repository
  }

  async create({ name, email, password }){
    if(!isEmailValid(email)){
      throw new ClientError("Email invalido!")
    }

    const isEmailTaken = await this.repository.isEmailTaken({email})

    if(isEmailTaken){
      throw new ClientError("Email já esta em uso!")
    }
    
    const hashedPassword = await hashPassword(password)

    return await this.repository.create({email, name, password: hashedPassword})
  }
}

module.exports = UserService